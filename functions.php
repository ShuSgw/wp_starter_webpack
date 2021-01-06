<?php
function add_all_cssandjs()
{
    wp_enqueue_script('mainJs', get_stylesheet_directory_uri().'/bundle.js');
    wp_enqueue_style('maincss', get_template_directory_uri().'/style.css', [], time());
}
add_action('wp_enqueue_scripts', 'add_all_cssandjs');
?>