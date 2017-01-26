<?php
/**
 * Converters: Abstract Post to JSON-LD Converter.
 *
 * An abstract converter which provides basic post conversion.
 *
 * @since   3.10.0
 * @package Wordlift
 */

/**
 * Define the {@link Wordlift_Abstract_Post_To_Jsonld_Converter} class.
 *
 * @since   3.10.0
 * @package Wordlift
 */
abstract class Wordlift_Abstract_Post_To_Jsonld_Converter implements Wordlift_Post_Converter {

	/**
	 * The JSON-LD context.
	 *
	 * @since 3.10.0
	 */
	const CONTEXT = 'http://schema.org';

	/**
	 * A {@link Wordlift_Entity_Type_Service} instance.
	 *
	 * @since  3.10.0
	 * @access protected
	 * @var \Wordlift_Entity_Type_Service $entity_type_service A {@link Wordlift_Entity_Type_Service} instance.
	 */
	protected $entity_type_service;

	/**
	 * A {@link Wordlift_Entity_Service} instance.
	 *
	 * @since  3.10.0
	 * @access protected
	 * @var \Wordlift_Entity_Service $entity_type_service A {@link Wordlift_Entity_Service} instance.
	 */
	protected $entity_service;

	/**
	 * A {@link Wordlift_User_Service} instance.
	 *
	 * @since  3.10.0
	 * @access private
	 * @var \Wordlift_User_Service $user_service A {@link Wordlift_User_Service} instance.
	 */
	protected $user_service;

	/**
	 * A {@link Wordlift_Attachment_Service} instance.
	 *
	 * @since  3.10.0
	 * @access private
	 * @var \Wordlift_Attachment_Service $attachment_service A {@link Wordlift_Attachment_Service} instance.
	 */
	protected $attachment_service;

	/**
	 * Wordlift_Post_To_Jsonld_Converter constructor.
	 *
	 * @since 3.10.0
	 *
	 * @param \Wordlift_Entity_Type_Service $entity_type_service A {@link Wordlift_Entity_Type_Service} instance.
	 * @param \Wordlift_Entity_Service      $entity_service      A {@link Wordlift_Entity_Service} instance.
	 * @param \Wordlift_User_Service        $user_service        A {@link Wordlift_User_Service} instance.
	 * @param \Wordlift_Attachment_Service  $attachment_service  A {@link Wordlift_Attachment_Service} instance.
	 */
	public function __construct( $entity_type_service, $entity_service, $user_service, $attachment_service ) {

		$this->entity_type_service = $entity_type_service;
		$this->entity_service      = $entity_service;
		$this->user_service        = $user_service;
		$this->attachment_service  = $attachment_service;

	}

	/**
	 * Convert the provided {@link WP_Post} to a JSON-LD array. Any entity reference
	 * found while processing the post is set in the $references array.
	 *
	 * @since 3.10.0
	 *
	 *
	 * @param int   $post_id    The post id.
	 * @param array $references An array of entity references.
	 *
	 * @return array A JSON-LD array.
	 */
	public function convert( $post_id, &$references = array() ) {

		// Get the post instance.
		if ( null === $post = get_post( $post_id ) ) {
			// Post not found.
			return null;
		}

		// Get the post URI @id.
		$id = $this->entity_service->get_uri( $post->ID );

		// Get the entity @type. We consider `post` BlogPostings.
		$type = $this->entity_type_service->get( $post_id );

		// Prepare the response.
		$jsonld = array(
			'@context'         => self::CONTEXT,
			'@id'              => $id,
			'@type'            => $this->relative_to_context( $type['uri'] ),
			'description'      => $this->get_excerpt( $post ),
			// We're setting the `mainEntityOfPage` to signal which one is the
			// main entity for the specified URL. It might be however that the
			// post/page is actually about another specific entity. How WL deals
			// with that hasn't been defined yet (see https://github.com/insideout10/wordlift-plugin/issues/451).
			//
			// See http://schema.org/mainEntityOfPage
			'mainEntityOfPage' => array(
				'@type' => 'WebPage',
				'@id'   => get_the_permalink( $post->ID ),
			),
		);

		$this->set_images( $post, $jsonld );

		// Get the entities referenced by this post and set it to the `references`
		// array so that the caller can do further processing, such as printing out
		// more of those references.
		$references = $this->entity_service->get_related_entities( $post->ID );

		return $jsonld;
	}

	/**
	 * If the provided value starts with the schema.org context, we remove the schema.org
	 * part since it is set with the '@context'.
	 *
	 * @since 3.10.0
	 *
	 * @param string $value The property value.
	 *
	 * @return string The property value without the context.
	 */
	protected function relative_to_context( $value ) {

		return 0 === strpos( $value, self::CONTEXT . '/' ) ? substr( $value, strlen( self::CONTEXT ) + 1 ) : $value;
	}

	/**
	 * Get the excerpt for the provided {@link WP_Post}.
	 *
	 * @since 3.10.0
	 *
	 * @param WP_Post $post The {@link WP_Post}.
	 *
	 * @return string The excerpt.
	 */
	protected function get_excerpt( $post ) {

		// Temporary pop the previous post.
		$original = isset( $GLOBALS['post'] ) ? $GLOBALS['post'] : null;

		// Setup our own post.
		setup_postdata( $GLOBALS['post'] = &$post );

		$excerpt = get_the_excerpt();

		// Restore the previous post.
		if ( null !== $original ) {
			setup_postdata( $GLOBALS['post'] = $original );
		}

		// Finally return the excerpt.
		return html_entity_decode( $excerpt );
	}

	/**
	 * Set the images, by looking for embedded images, for images loaded via the
	 * gallery and for the featured image.
	 *
	 * @since 3.10.0
	 *
	 * @param WP_Post $post   The target {@link WP_Post}.
	 * @param array   $jsonld The JSON-LD array.
	 */
	protected function set_images( $post, &$jsonld ) {

		// Prepare the attachment ids array.
		$ids = array();

		// Set the thumbnail id as first attachment id, if any.
		if ( '' !== $thumbnail_id = get_post_thumbnail_id( $post->ID ) ) {
			$ids[] = $thumbnail_id;
		}

		$embeds  = array_diff( $this->attachment_service->get_embeds( $post->post_content ), $ids );
		$gallery = array_diff( $this->attachment_service->get_gallery( $post ), $ids, $embeds );


		// Map the attachment ids to images' data structured for schema.org use.
		$jsonld['image'] = array_map( function ( $item ) {

			// @todo: we're not sure that we're getting attachment data here, we
			// should filter `false`s.

			// Get the attachment data.
			$attachment = wp_get_attachment_image_src( $item, 'full' );

			// Refactor data as per schema.org specifications.
			return array(
				'@type'  => 'ImageObject',
				'url'    => $attachment[0],
				'width'  => $attachment[1] . 'px',
				'height' => $attachment[2] . 'px',
			);
		}, $ids, $embeds, $gallery );

	}

}
