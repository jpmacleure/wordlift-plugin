<?php

/**
 * Sets-up the widget. This is called by WordPress when the shortcode is inserted in the body.
 */
function wl_shortcode_blog_map( $atts ) {

	//extract attributes and set default values
	$chord_atts = shortcode_atts( array(
		'width'  => '100%',
		'height' => '500px',
		'depth'  => 3
	), $atts );

	$post_id = wl_shortcode_chord_most_referenced_entity_id();
	if ( $post_id == null ) {
		return "Blog-map: no entities found.";
	}
	$widget_id = 'wl-blog-map';

	// Adding css
	wp_enqueue_style( 'vis', dirname( plugin_dir_url( __FILE__ ) ) . '/public/js/visjs/vis.min.css' );

	// Adding javascript code
	wp_enqueue_script( 'vis', dirname( plugin_dir_url( __FILE__ ) ) . '/public/js/visjs/vis.min.js' );
	wp_enqueue_script( 'blog-map-launcher', dirname( plugin_dir_url( __FILE__ ) ) . '/public/js/wordlift_shortcode_blog_map.js' );
	wp_localize_script( 'blog-map-launcher', 'blog_map_params', array(
			'ajax_url'          => admin_url( 'admin-ajax.php' ),
			'action'            => 'wl_chord',  // let's piggy back on chord graph functions
			'default_thumbnail' => dirname( plugin_dir_url( __FILE__ ) ) . '/images/wordlift-logo-black-32x32'
		)
	);

	// Escaping atts.
	$esc_id      = esc_attr( $widget_id );
	$esc_width   = esc_attr( $chord_atts['width'] );
	$esc_height  = esc_attr( $chord_atts['height'] );
	$esc_post_id = esc_attr( $post_id );
	$esc_depth   = esc_attr( $chord_atts['depth'] );

	// Building template.
	return <<<EOF
<div id="$esc_id"
    data-post-id="$esc_post_id"
    data-depth="$esc_depth"
    style="width:$esc_width;
    height:$esc_height;
    background-color:white;
    margin-top:10px;
    margin-bottom:10px">
</div>
EOF;

}

/**
 * Registers the *wl_blog_map* shortcode.
 */
function wl_shortcode_blog_map_register() {
	add_shortcode( 'wl_blog_map', 'wl_shortcode_blog_map' );
}

add_action( 'init', 'wl_shortcode_blog_map_register' );


