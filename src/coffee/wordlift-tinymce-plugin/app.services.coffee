angular.module('wordlift.tinymce.plugin.services', ['wordlift.tinymce.plugin.config'])
  .service('EditorService', ['AnnotationService', '$rootScope', (AnnotationService, $rootScope) ->

    $rootScope.$on 'AnnotationService.annotations', (event, annotations) ->
      console.log 'I received some annotations'

      currentHtmlContent = tinyMCE.get('content').getContent({format : 'raw'})

      for textAnnotation in annotations
        console.log(textAnnotation)
        selectionHead = textAnnotation['enhancer:selection-prefix']['@value']
          .replace( '\(', '\\(' )
          .replace( '\)', '\\)' )
        selectionTail = textAnnotation['enhancer:selection-suffix']['@value']
          .replace( '\(', '\\(' )
          .replace( '\)', '\\)' )
        regexp = new RegExp( "(\\W|^)(#{textAnnotation['enhancer:selected-text']['@value']})(\\W|$)(?![^<]*\">?)" )
        console.log regexp
        replace = "$1<strong id=\"#{textAnnotation['@id']}\" class=\"textannotation\"
          typeof=\"http://fise.iks-project.eu/ontology/TextAnnotation\">$2</strong>$3"
        currentHtmlContent = currentHtmlContent.replace( regexp, replace )

        isDirty = tinyMCE.get( "content").isDirty()
        tinyMCE.get( "content").setContent( currentHtmlContent )
        tinyMCE.get( "content").isNotDirty = 1 if not isDirty

      tinyMCE.get( "content").onClick.add (editor, e) ->
        $rootScope.$apply(
          console.log("Click within the editor on element with id #{e.target.id}")
          $rootScope.$broadcast 'EditorService.annotationClick', e.target.id
        )

    ping: (message)    -> console.log message
    analyze: (content) -> AnnotationService.analyze content

  ])
  .service('AnnotationService', ['$rootScope', '$http', ($rootScope, $http) ->
    
    currentAnalysis = {}
    
    $rootScope.$on 'EditorService.annotationClick', (event, id) ->
      console.log "Ops!! Element with id #{id} was clicked!"
      findEntitiesForAnnotation(id)
    
    # Find all text annotation for the current analyzed text
    findAllAnnotations = () ->
      textAnnotations = currentAnalysis['@graph'].filter (item) ->
          'enhancer:TextAnnotation' in item['@type'] and item['enhancer:selection-prefix']?
      $rootScope.$broadcast 'AnnotationService.annotations', textAnnotations    
    
    # Find all Entities for a certain text annotation identified by 'annotationId'
    findEntitiesForAnnotation = (annotationId) ->
      console.log "Going to find entities for annotation with ID #{annotationId}"
        
      entityAnnotations = currentAnalysis['@graph'].filter (item) ->
          'enhancer:EntityAnnotation' in item['@type'] and item['dc:relation'] == annotationId
      # Retrieve related entities ids
      entityIds = entityAnnotations.map (entityAnnotation) ->
        entityAnnotation['enhancer:entity-reference']
      # Retrieve related entities 
      entities = currentAnalysis['@graph'].filter (item) ->
        item['@id'] in entityIds 

      $rootScope.$broadcast 'AnnotationService.entityAnnotations', entities   
    
    # Call redlink api trough Wp Ajax bridge in order to perform the semantic analysis
    analyze: (content) ->
      $http
        method: 'POST'
        url: ajaxurl
        params:
          action: 'wordlift_analyze'
        data: content
      .success (data, status, headers, config) -> 
        currentAnalysis = data
        for i in data['@graph']
          console.log "!!! #{i['@id']}"
        findAllAnnotations()
      true
  ])