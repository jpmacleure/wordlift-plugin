<?php
/*
Plugin Name: WordLift
Plugin URI: http://wordlift.it
Description: Supercharge your WordPress Site with Smart Tagging and #Schemaorg support - a brand new way to write, organise and publish your contents to the Linked Data Cloud.
Version: 3.0.0-SNAPSHOT
Author: InSideOut10
Author URI: http://www.insideout.io
License: APL
*/

if (!function_exists('write_log')) {
    function write_log ( $log )  {
        if ( true === WP_DEBUG ) {
            if ( is_array( $log ) || is_object( $log ) ) {
                error_log( print_r( $log, true ) );
            } else {
            error_log( $log );
            }
        }
    }
}

// Define the basic options for HTTP calls to REDLINK.
define( 'WL_REDLINK_API_HTTP_OPTIONS', serialize( array(
    'timeout'     => 60,
    'redirection' => 5,
    'httpversion' => '1.1',
    'blocking'    => true,
    'cookies'     => array()
) ) );


/**
 * Get the URL of the specified physical file.
 * @param string $file The path to the file from the plugin root folder.
 * @return string The URL to the file.
 */
function wordlift_get_url($file)
{

    // if WordLift is set into development mode, then provide a static URL, as development is done with symbolic link.
    if (defined('WORDLIFT_DEVELOPMENT')) {
        return '/wp-content/plugins/wordlift' . $file;
    }

    // use standard WP methods in production mode.
    return plugins_url($file, __FILE__);
}

/**
 * Add buttons hook for the TinyMCE editor. This method is called by the WP init hook.
 */
function wordlift_buttonhooks()
{

    // Only add hooks when the current user has permissions AND is in Rich Text editor mode
    if ((current_user_can('edit_posts') || current_user_can('edit_pages')) && get_user_option('rich_editing')) {
        add_filter('mce_external_plugins', 'wordlift_register_tinymce_javascript');
        add_filter('mce_buttons',          'wordlift_register_buttons');
    }
}

/**
 * Register the TinyMCE buttons. This method is called by the WP mce_buttons hook.
 * @param array $buttons The existing buttons array.
 * @return array The modified buttons array.
 */
function wordlift_register_buttons($buttons)
{
    // push the wordlift button the array.
    array_push($buttons, 'wordlift');
    return $buttons;
}

/**
 * Load the TinyMCE plugin. This method is called by the WP mce_external_plugins hook.
 * @param array $plugin_array The existing plugins array.
 * @return array The modified plugins array.
 */
function wordlift_register_tinymce_javascript($plugin_array)
{
    // add the wordlift plugin.
    $plugin_array['wordlift'] = 'https://rawgithub.com/insideout10/wordlift-plugin-js/master/dist/js/wordlift.js';
    return $plugin_array;
}

/**
 * Enable microdata schema.org tagging.
 * see http://vip.wordpress.com/documentation/register-additional-html-attributes-for-tinymce-and-wp-kses/
 */
function wordlift_allowed_post_tags() {
    global $allowedposttags;

    $tags = array( 'span' );
    $new_attributes = array(
        'itemscope' => array(),
        'itemtype'  => array(),
        'itemprop'  => array(),
        'itemid'    => array()
    );

    foreach ( $tags as $tag ) {
        if ( isset( $allowedposttags[ $tag ] ) && is_array( $allowedposttags[ $tag ] ) )
            $allowedposttags[ $tag ] = array_merge( $allowedposttags[ $tag ], $new_attributes );
    }
}

// init process for button control
add_action('init', 'wordlift_buttonhooks');
// add allowed post tags.
add_action('init', 'wordlift_allowed_post_tags');


// Ajax Admin Section

add_action('wp_ajax_wordlift_analyze', 'wordlift_ajax_analyze_action');

// Analyze a text
function wordlift_ajax_analyze_action()
{
    if ((current_user_can('edit_posts') || current_user_can('edit_pages')) && get_user_option('rich_editing')) {

        // Get the Redlink enhance URL.
        $api_url  = wordlift_redlink_enhance_url();

        $response = wp_remote_post($api_url, array(
                'method' => 'POST',
                'timeout' => 45,
                'redirection' => 5,
                'httpversion' => '1.0',
                'blocking' => true,
                'headers' => array(
                    'Accept' => 'application/json',
                    'Content-type' => 'text/plain',
                ),
                'body' => file_get_contents("php://input"),
                'cookies' => array()
            )
        );

        if ( is_wp_error( $response ) ) {
            $error_message = $response->get_error_message();
            echo "Something went wrong: $error_message";
            die();
        } else {

            // Reprint the headers, mostly for debugging purposes.
            foreach ($response['headers'] as $header => $value) {
                if ( strpos( strtolower( $header ), 'x-redlink-') === 0 ) {
                    header( "$header: $value" );
                }
            }

            echo $response['body'];
            die();
        }
    }
}

/**
 * Register additional scripts for the admin UI.
 */
function wordlift_admin_enqueue_scripts() {
    global $post;

    wp_register_style('wordlift_wp_admin_css', 'https://rawgithub.com/insideout10/wordlift-plugin-js/master/dist/css/wordlift.min.css' );
    wp_enqueue_style('wordlift_wp_admin_css');
    wp_enqueue_style('jquery-ui-autocomplete', '', array('jquery-ui-widget', 'jquery-ui-position'));


    wp_enqueue_script( 'jquery-ui-autocomplete', '', array('jquery-ui-widget', 'jquery-ui-position') );
    wp_enqueue_script( 'angularjs', wordlift_get_url('/bower_components/angular/angular.min.js') );
    wp_localize_script('angularjs', 'thePost', get_post( $post->id, ARRAY_A ) );
}
add_action('admin_enqueue_scripts', 'wordlift_admin_enqueue_scripts');

/**
 * Hooked to *wp_kses_allowed_html* filter, adds microdata attributes.
 * @param array $allowedtags The array with the currently configured elements and attributes.
 * @param string $context    The context.
 * @return array An array which contains allowed microdata attributes.
 */
function wordlift_allowed_html( $allowedtags, $context ) {

    if ( 'post' !== $context ) {
        return $allowedtags;
    }

    return array_merge_recursive( $allowedtags, array(
        'span' => array(
            'itemscope' => true,
            'itemtype'  => true,
            'itemid'    => true,
            'itemprop'  => true
        )
    ) );
}
add_filter('wp_kses_allowed_html', 'wordlift_allowed_html', 10, 2 );

/**
 * Get the entity URI of the provided post.
 * @param int $post_id The post ID.
 * @return string|null The URI of the entity or null if not configured.
 */
function wl_get_entity_uri( $post_id ) {

    $uri = get_post_meta( $post_id, 'entity_url', true );

    // Set the URI if it isn't set yet.
    if ( empty( $uri ) ) {
        $uri = wordlift_build_entity_uri( $post_id ); //  "http://data.redlink.io/$user_id/$dataset_id/post/$post->ID";
        wl_set_entity_uri( $post_id, $uri );
    }

    return $uri;
}

/**
 * Save the entity URI for the provided post ID.
 * @param int $post_id The post ID.
 * @param string $uri The post URI.
 * @return bool True if successful, otherwise false.
 */
function wl_set_entity_uri( $post_id, $uri ) {

    return update_post_meta( $post_id, 'entity_url', $uri );
}

/**
 * Save the specified entities to the local storage.
 * @param array $entities      An array of entities.
 * @param int $related_post_id A related post ID.
 * @return array An array of posts.
 */
function wl_save_entities( $entities, $related_post_id = null ) {

    write_log( "wl_save_entities [ entities count :: " . count( $entities ) . " ]\n" );

    // Prepare the return array.
    $posts = array();

    // Save each entity and store the post id.
    foreach ( $entities as $entity ) {
        $uri    = $entity['uri'];
        $label  = $entity['label'];
        $type   = $entity['type'];
        $description = $entity['description'];
        $images = ( isset( $entity['image'] ) ?
            ( is_array( $entity['image'] )
                ? $entity['image']
                : array( $entity['image'] ) )
            : array() );
        $same_as = ( isset( $entity['sameas'] ) ?
            ( is_array( $entity['sameas'] )
                ? $entity['sameas']
                : array( $entity['sameas'] ) )
            : array() );

        // Save the entity.
        $post = wl_save_entity( $uri, $label, $type, $description, $images, $related_post_id, $same_as );

        // Store the post in the return array if successful.
        if ( null !== $post ) {
            array_push( $posts, $post );
        }
    }

    return $posts;
}

/**
 * Save the specified data as an entity in WordPress.
 * @param string $uri         The entity URI.
 * @param string $label       The entity label.
 * @param string $type        The entity type (an array with 'class' and 'url' keys).
 * @param string $description The entity description.
 * @param array $images       An array of image URLs.
 * @param int $related_post_id A related post ID.
 * @param array $same_as      An array of sameAs URLs.
 * @return null|WP_Post A post instance or null in case of failure.
 */
function wl_save_entity( $uri, $label, $type, $description, $images = array(), $related_post_id = null, $same_as = array() ) {

    write_log("wl_save_entity [ uri :: $uri ][ label :: $label ]");

    // Check whether an entity already exists with the provided URI.
    $post = wordlift_get_entity_post_by_uri( $uri );

    // Return the found post, do not overwrite data.
    if ( null !== $post ) {
        write_log("wl_save_entity : post exists [ post id :: $post->ID ][ uri :: $uri ][ label :: $label ]");
        return $post;
    }

    // No post found, create a new one.
    $params = array(
        'post_status'  => 'draft',
        'post_type'    => 'entity',
        'post_title'   => $label,
        'post_content' => $description,
        'post_excerpt' => ''
    );

    // create or update the post.
    $post_id = wp_insert_post( $params, true );

    // TODO: handle errors.
    if ( is_wp_error( $post_id ) ) {
        write_log( "wl_save_entity : error occurred" );
        // inform an error occurred.
        return null;
    }

    // Set the type.
    if ( isset( $type['class'] ) ) {
        wl_set_entity_types( $post_id, $type['class'] );
    }

    // Get a dataset URI for the entity.
    $wl_uri = wordlift_build_entity_uri( $post_id );

    // Save the entity URI.
    wl_set_entity_uri( $post_id, $wl_uri );

    // Add the uri to the sameAs data if it's not a local URI.
    if ($wl_uri !== $uri) {
        array_push( $same_as, $uri );
    }
    // Save the sameAs data for the entity.
    wl_set_same_as( $post_id, $same_as );

    write_log("wl_save_entity [ post id :: $post_id ][ uri :: $uri ][ label :: $label ][ wl uri :: $wl_uri ][ type class :: " . ( isset( $type['class'] ) ? $type['class'] : 'not set' ) . " ][ images count :: " . count( $images ) . " ][ same_as count :: " . count( $same_as ) . " ]");

    foreach ( $images as $image_remote_url ) {

        // Check if there is an existing attachment for this post ID and source URL.
        $existing_image = wl_get_attachment_for_source_url( $post_id, $image_remote_url );

        // Skip if an existing image is found.
        if ( null !== $existing_image ) {
            continue;
        }

        // Save the image and get the local path.
        $image = wl_save_image( $image_remote_url );

        // Get the local URL.
        $filename = $image['path'];
        $url      = $image['url'];
        $content_type = $image['content_type'];

        $attachment = array(
            'guid' => $url,
            // post_title, post_content (the value for this key should be the empty string), post_status and post_mime_type
            'post_title'   => $label, // Set the title to the post title.
            'post_content' => '',
            'post_status' => 'inherit',
            'post_mime_type' => $content_type
        );

        // Create the attachment in WordPress and generate the related metadata.
        $attachment_id = wp_insert_attachment( $attachment, $filename, $post_id );

        // Set the source URL for the image.
        wl_set_source_url( $attachment_id, $image_remote_url );

        $attachment_data = wp_generate_attachment_metadata( $attachment_id, $filename );
        wp_update_attachment_metadata( $attachment_id, $attachment_data );

        // Set it as the featured image.
        set_post_thumbnail( $post_id, $attachment_id );
    }

    // Add the related post ID if provided.
    if ( null !== $related_post_id ) {
        // Add related entities or related posts according to the post type.
        wl_add_related( $post_id, $related_post_id );
        // And vice-versa (be aware that relations are pushed to Redlink with wl_push_to_redlink).
        wl_add_related( $related_post_id, $post_id );
    }

    // The entity is pushed to Redlink on save by the function hooked to save_post.
    // save the entity in the triple store.
    wl_push_to_redlink( $post_id );

    // finally return the entity post.
    return get_post( $post_id );
}

/**
 * Save the image with the specified URL locally.
 * @param string $url The image remote URL.
 * @return array An array with information about the saved image (*path*: the local path to the image, *url*: the local
 * url, *content_type*: the image content type)
 */
function wl_save_image( $url ) {

    $parts     = parse_url( $url );
    $path      = $parts['path'];

    // Get the bare filename (filename w/o the extension).
    $basename  = pathinfo( $path, PATHINFO_FILENAME );

    // Chunk the bare name to get a subpath.
    $chunks    = chunk_split( strtolower( $basename ), 3, DIRECTORY_SEPARATOR );

    // Get the base dir.
    $wp_upload_dir = wp_upload_dir();
    $base_dir  = $wp_upload_dir['basedir'];
    $base_url  = $wp_upload_dir['baseurl'];

    // Get the full path to the local filename.
    $image_path = '/' . $chunks;
    $image_full_path = $base_dir . $image_path;
    $image_full_url  = $base_url . $image_path;

    // Create the folders.
    if ( ! ( file_exists( $image_full_path ) && is_dir( $image_full_path ) ) ) {
        if ( false === mkdir( $image_full_path, 0777, true ) ) {
            write_log( "wl_save_image : failed creating dir [ image full path :: $image_full_path ]\n" );
        }
    };

    // Request the remote file.
    $response  = wp_remote_get( $url );
    $content_type = wp_remote_retrieve_header( $response, 'content-type' );

    switch ( $content_type ) {
        case 'image/jpeg':
        case 'image/jpg':
            $extension = ".jpg";
            break;
        case 'image/svg+xml':
            $extension = ".svg";
            break;
        case 'image/gif':
            $extension = ".gif";
            break;
        case 'image/png':
            $extension = ".png";
            break;
        default:
            $extension = '';
    }

    // Complete the local filename.
    $image_full_path .= $basename . $extension;
    $image_full_url  .= $basename . $extension;

    // Store the data locally.
    file_put_contents( $image_full_path, wp_remote_retrieve_body( $response ) );

    write_log( "wl_save_image [ url :: $url ][ content type :: $content_type ][ image full path :: $image_full_path ][ image full url :: $image_full_url ]\n" );

    // Return the path.
    return array(
        'path' => $image_full_path,
        'url'  => $image_full_url,
        'content_type' => $content_type
    );
}


/**
 * Get the URI and stylesheet class associated with the provided entity.
 * @param object|array|string $entity An entity instance.
 * @return array An array containing a class and an URI element.
 */
function wl_get_entity_type( $entity ) {

    // Prepare the types array.
    $types = wl_type_to_types( $entity );

    if ( in_array( 'http://schema.org/Person', $types )
        || in_array( 'http://rdf.freebase.com/ns/people.person', $types )) {
        return array(
            'class' => 'person',
            'uri'   => 'http://schema.org/Person'
        );
    }

    if ( in_array( 'http://schema.org/Organization', $types )
        || in_array( 'http://rdf.freebase.com/ns/government.government', $types )
        || in_array( 'http://schema.org/Newspaper', $types ) ) {
        return array(
            'class' => 'organization',
            'uri'   => 'http://schema.org/Organization'
        );
    }

    if ( in_array( 'http://schema.org/Place', $types )
        || in_array( 'http://rdf.freebase.com/ns/location.location', $types ) ) {
        return array(
            'class' => 'place',
            'uri'   => 'http://schema.org/Place'
        );
    }

    if ( in_array( 'http://schema.org/Event', $types )
        || in_array( 'http://dbpedia.org/ontology/Event', $types ) ) {
        return array(
            'class' => 'event',
            'uri'   => 'http://schema.org/Event'
        );
    }

    if ( in_array( 'http://rdf.freebase.com/ns/music.artist', $types )
        || in_array( 'http://schema.org/MusicAlbum', $types ) ) {
        return array(
            'class' => 'event',
            'uri'   => 'http://schema.org/Event'
        );
    }


    if ( in_array( 'http://www.opengis.net/gml/_Feature', $types ) ) {
        return array(
            'class' => 'place',
            'uri'   => 'http://schema.org/Place'
        );
    }

    return array(
        'class' => 'thing',
        'uri'   => 'http://schema.org/Thing'
    );
}

/**
 * Get a types array from an item.
 * @param object|array|string $item An item with a '@type' property (if the property doesn't exist, an empty array is returned).
 * @return array The items array (or an empty array if the '@type' property doesn't exist).
 */
function wl_type_to_types( $item ) {

    if ( is_string( $item ) ) {
        return array( $item );
    }

    if ( is_array( $item ) ) {
        return $item;
    }

    return !isset( $item->{'@type'} )
        ? array() // Set an empty array if type is not set on the item.
        : ( is_array( $item->{'@type'} ) ? $item->{'@type'} : array( $item->{'@type'} ) );
}

/**
 * Bind the specified post and entities together.
 * @param int $post_id        The post ID.
 * @param array $entity_posts An array of entity posts or post IDs.
 */
function wl_bind_post_to_entities( $post_id, $entity_posts ) {

    // Get the entity IDs.
    $entity_ids = array();
    foreach ( $entity_posts as $entity_post ) {
        // Support both an array of posts or an array of post ids.
        $entity_post_id = ( is_numeric( $entity_post ) ? $entity_post : $entity_post->ID );
        array_push( $entity_ids, $entity_post_id );

        // Set the related posts.
        wl_add_related_posts( $entity_post_id, array( $post_id ) );
    }

    wl_add_related_entities( $post_id, $entity_ids );
}

/**
 * Set the related posts IDs for the specified post ID.
 * @param int $post_id A post ID.
 * @param array $related_posts An array of related post IDs.
 */
function wl_set_related_posts( $post_id, $related_posts ) {

    write_log( "wl_set_related_posts [ post id :: $post_id ][ related posts :: " . join( ',', $related_posts ) . " ]" );

    delete_post_meta( $post_id, 'wordlift_related_posts' );
    add_post_meta( $post_id, 'wordlift_related_posts', $related_posts, true );
}

/**
 * Set the related posts IDs for the specified post ID.
 * @param int $post_id A post ID.
 * @param int|array $new_post_ids An array of related post IDs.
 */
function wl_add_related_posts( $post_id, $new_post_ids ) {

    // Convert the parameter to an array.
    $new_post_ids = ( is_array( $new_post_ids ) ? $new_post_ids : array( $new_post_ids ) );

    write_log( "wl_add_related_posts [ post id :: $post_id ][ new post ids :: " . join( ',', $new_post_ids ) . " ]" );

    // Get the existing post IDs and merge them together.
    $related = wl_get_related_post_ids( $post_id );
    $related = array_unique( array_merge( $related, $new_post_ids ) );

    wl_set_related_posts( $post_id, $related );
}


/**
 * Set the related entity posts IDs for the specified post ID.
 * @param int $post_id A post ID.
 * @param array $related_entities An array of related entity post IDs.
 */
function wl_set_related_entities( $post_id, $related_entities ) {

    write_log( "wl_set_related_entities [ post id :: $post_id ][ related entities :: " . join( ',', $related_entities ) . " ]" );

    delete_post_meta( $post_id, 'wordlift_related_entities' );
    add_post_meta( $post_id, 'wordlift_related_entities', $related_entities, true );
}

/**
 * Set the sameAs URIs for the specified post ID.
 * @param int $post_id A post ID.
 * @param array|string $same_as An array of same as URIs or a single URI string.
 */
function wl_set_same_as( $post_id, $same_as ) {

    // Prepare the same as array.
    $same_as_array = ( is_array( $same_as ) ? $same_as : array( $same_as ) );

    write_log( "wl_set_same_as [ post id :: $post_id ][ same as :: " . join( ',', $same_as_array ) . " ]" );

    // Replace the existing same as with the new one.
    delete_post_meta( $post_id, 'entity_same_as' );

    foreach ( $same_as_array as $item ) {
        add_post_meta( $post_id, 'entity_same_as', $item, false );
    }
}

/**
 * Get the sameAs URIs for the specified post ID.
 * @param int $post_id A post ID.
 * @return array An array of sameAs URIs.
 */
function wl_get_same_as( $post_id ) {

    // Get the related array (single _must_ be true, refer to http://codex.wordpress.org/Function_Reference/get_post_meta)
    $same_as = get_post_meta( $post_id, 'entity_same_as', false );

    if ( empty( $same_as ) ) {
        return array();
    }

    // Ensure an array is returned.
    return ( is_array( $same_as ) ? $same_as : array( $same_as ) );
}


/**
 * Set the related entity posts IDs for the specified post ID.
 * @param int $post_id A post ID.
 * @param int|array $new_entity_post_ids An array of related entity post IDs.
 */
function wl_add_related_entities( $post_id, $new_entity_post_ids ) {

    // Convert the parameter to an array.
    $new_entity_post_ids = ( is_array( $new_entity_post_ids ) ? $new_entity_post_ids : array( $new_entity_post_ids ) );

    write_log( "wl_add_related_entities [ post id :: $post_id ][ related entities :: " . join( ',', $new_entity_post_ids ) . " ]" );

    // Get the existing post IDs and merge them together.
    $related = wl_get_related_entities( $post_id );
    $related = array_unique( array_merge( $related, $new_entity_post_ids ) );

    wl_set_related_entities( $post_id, $related );
 }

/**
 * Get the IDs of posts related to the specified post.
 * @param int $post_id The post ID.
 * @return array An array of posts related to the one specified.
 */
function wl_get_related_post_ids( $post_id ) {

    // Get the related array (single _must_ be true, refer to http://codex.wordpress.org/Function_Reference/get_post_meta)
    $related = get_post_meta( $post_id, 'wordlift_related_posts', true );

    write_log( "wl_get_related_post_ids [ post id :: $post_id ][ empty related :: " . ( empty( $related ) ? 'true' : 'false' ) . "  ]" );

    if ( empty( $related ) ) {
        return array();
    }

    // Ensure an array is returned.
    return ( is_array( $related )
        ? $related
        : array( $related ) );
}

/**
 * Get the IDs of entities related to the specified post.
 * @param int $post_id The post ID.
 * @return array An array of posts related to the one specified.
 */
function wl_get_related_entities( $post_id ) {

    // Get the related array (single _must_ be true, refer to http://codex.wordpress.org/Function_Reference/get_post_meta)
    $related = get_post_meta( $post_id, 'wordlift_related_entities', true );

    if ( empty( $related ) ) {
        return array();
    }

    // Ensure an array is returned.
    return ( is_array( $related )
        ? $related
        : array( $related ) );
}

/**
 * Convert a time string to a SPARQL datetime.
 * @param string $time The time string (in 2014-03-03T08:15:55+00:00 format).
 * @return string A sparql dateTime string (e.g. "2014-03-03T08:15:55.000Z"^^<http://www.w3.org/2001/XMLSchema#dateTime>)
 */
function wl_get_sparql_time( $time ) {

    return '"' . str_replace( '+00:00', '.000Z', $time ) . '"^^<http://www.w3.org/2001/XMLSchema#dateTime>';
}

/**
 * Get the modified time of the provided post. If the time is negative, return the published date.
 * @param object $post A post instance.
 * @return string A datetime.
 */
function wl_get_post_modified_time( $post ) {

    $date_modified  = get_post_modified_time( 'c', true, $post );

    if ( '-' === substr( $date_modified, 0, 1 ) ) {
        return get_the_time('c', $post );
    }

    return $date_modified;
}

/**
 * Unbind post and entities.
 * @param int $post_id The post ID.
 */
function wl_unbind_post_from_entities( $post_id ) {

    write_log( "wl_unbind_post_from_entities [ post id :: $post_id ]" );

    $entities = wl_get_related_entities( $post_id );
    foreach ( $entities as $entity_post_id ) {

        // Remove the specified post id from the list of related posts.
        $related_posts = wl_get_related_post_ids( $entity_post_id );
        if ( false !== ( $key = array_search( $post_id, $related_posts) ) ) {
            unset( $related_posts[$key] );
        }

        wl_set_related_posts( $entity_post_id, $related_posts );
    }

    // Reset the related entities for the post.
    wl_set_related_entities( $post_id, array() );
}

/**
 * Get all the images bound to a post.
 * @param int $post_id The post ID.
 * @return array An array of image URLs.
 */
function wl_get_image_urls( $post_id ) {

    write_log( "wl_get_image_urls [ post id :: $post_id ]" );

    $images = get_children( array (
        'post_parent'    => $post_id,
        'post_type'      => 'attachment',
        'post_mime_type' => 'image'
    ));

    // Return an empty array if no image is found.
    if ( empty( $images ) ) {
        return array();
    }

    // Prepare the return array.
    $image_urls = array();

    foreach ( $images as $attachment_id => $attachment ) {
        array_push( $image_urls, wp_get_attachment_url( $attachment_id ) );
    }

    write_log( "wl_get_image_urls [ post id :: $post_id ][ image urls count :: " . count( $image_urls ) . " ]" );

    return $image_urls;
}

/**
 * Get a SPARQL fragment with schema:image predicates.
 * @param string $uri  The URI subject of the statements.
 * @param int $post_id The post ID.
 * @return string The SPARQL fragment.
 */
function wl_get_sparql_images( $uri, $post_id ) {

    $sparql = '';

    // Add SPARQL stmts to write the schema:image.
    $image_urls = wl_get_image_urls( $post_id );
    foreach ( $image_urls as $image_url ) {
        $image_url_esc = wordlift_esc_sparql( $image_url );
        $sparql .= " <$uri> schema:image <$image_url_esc> . \n";
    }

    return $sparql;
}

/**
 * Get an attachment with the specified parent post ID and source URL.
 * @param int $parent_post_id The parent post ID.
 * @param string $source_url  The source URL.
 * @return WP_Post|null A post instance or null if not found.
 */
function wl_get_attachment_for_source_url( $parent_post_id, $source_url ) {

    write_log( "wl_get_attachment_for_source_url [ parent post id :: $parent_post_id ][ source url :: $source_url ]" );

    $posts = get_posts( array(
        'post_type'      => 'attachment',
        'posts_per_page' => 1,
        'post_status'    => 'any',
        'post_parent'    => $parent_post_id,
        'meta_key'       => 'wl_source_url',
        'meta_value'     => $source_url
    ) );

    // Return the found post.
    if ( 1 === count( $posts ) ) {
        return $posts[0];
    }

    // Return null.
    return null;
}

/**
 * Add related post IDs to the specified post ID, automatically choosing whether to add the related to entities or to
 * posts.
 * @param int $post_id           The post ID.
 * @param int|array $related_id  A related post/entity ID or an array of posts/entities.
 */
function wl_add_related( $post_id, $related_id ) {

    // Ensure we're dealing with an array.
    $related_id_array = ( is_array( $related_id ) ? $related_id : array( $related_id ) );

    // Prepare the related arrays.
    $related_entities = array();
    $related_posts    = array();

    foreach ( $related_id_array as $id ) {

        // If it's an entity add the entity to the related entities.
        if ( 'entity' === get_post_type( $id ) ) {
            array_push( $related_entities, $id );
        } else {
            // Else add it to the related posts.
            array_push( $related_posts, $id );
        }
    }

    if ( 0 < count ( $related_entities ) ) {
        wl_add_related_entities( $post_id, $related_entities );
    }
    if ( 0 < count ( $related_posts ) ) {
        wl_add_related_posts( $post_id, $related_posts );
    }
}

/**
 * Set the source URL.
 * @param int $post_id       The post ID.
 * @param string $source_url The source URL.
 */
function wl_set_source_url( $post_id, $source_url ) {

    delete_post_meta( $post_id, 'wl_source_url' );
    add_post_meta( $post_id, 'wl_source_url', $source_url );
}

require_once('libs/php-json-ld/jsonld.php');

// add editor related methods.
require_once('wordlift_editor.php');
// add configuratiokn-related methods.
require_once('wordlift_configuration.php');
// add the WordLift admin bar.
require_once('wordlift_admin_bar.php');
// add the WordLift admin menu. - the entity admin menu is handled as a custom post type.
//require_once('wordlift_admin_menu.php');
// add the WordLift entity custom type.
require_once('wordlift_entity_custom_type.php');
// filters the post content when saving posts.
require_once('wordlift_content_filter.php');
// add the entities meta box.
require_once('wordlift_admin_meta_box_entities.php');
require_once('wordlift_admin_meta_box_related_posts.php');
// add callbacks on post save to notify data changes from wp to redlink triple store
require_once('wordlift_to_redlink_data_push_callbacks.php');

require_once('wordlift_shortcode_related_posts.php');

require_once('wordlift_indepth_articles.php');

require_once('wordlift_freebase_image_proxy.php');

// add the search entity AJAX.
require_once('wordlift_ajax_search_entities.php');

// load languages.
// TODO: the following call gives for granted that the plugin is in the wordlift directory,
//       we're currently doing this because wordlift is symbolic linked.
load_plugin_textdomain('wordlift', false, '/wordlift/languages' );