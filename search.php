<?php
get_header();
?>
<?php if ( have_posts() ) : ?>
<?php printf( esc_html__( 'Search Results for: %s', 'helllo' ), '<span>' . get_search_query() . '</span>' );?>
</header><!-- .page-header -->

<?php
while ( have_posts() ) :
	echo 'hello';
endwhile;
?>

</main><!-- #main -->

<?php
endif;
get_sidebar();
get_footer();