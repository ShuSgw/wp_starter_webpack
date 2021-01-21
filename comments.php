<?php

if ( post_password_required() ) {
	return;
}
?>

<?php
	if ( have_comments() ) :
		?>
<?php
	$helllo_comment_count = get_comments_number();
	if ( '1' === $helllo_comment_count ) {
		printf(
			/* translators: 1: title. */
			esc_html__( 'One thought on &ldquo;%1$s&rdquo;', 'helllo' ),
			'<span>' . wp_kses_post( get_the_title() ) . '</span>'
		);
	} else {
		printf( 
			/* translators: 1: comment count number, 2: title. */
			esc_html( _nx( '%1$s thought on &ldquo;%2$s&rdquo;', '%1$s thoughts on &ldquo;%2$s&rdquo;', $helllo_comment_count, 'comments title', 'helllo' ) ),
			number_format_i18n( $helllo_comment_count ), // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			'<span>' . wp_kses_post( get_the_title() ) . '</span>'
		);
	}
?>

<?php the_comments_navigation(); ?>

<ol class="comment-list">
    <?php
			wp_list_comments(
				array(
					'style'      => 'ol',
					'short_ping' => true,
				)
			);
			?>
</ol><!-- .comment-list -->

<?php
		the_comments_navigation();

		// If comments are closed and there are comments, let's leave a little note, shall we?
		if ( ! comments_open() ) :
			?>
<p class="no-comments"><?php esc_html_e( 'Comments are closed.', 'helllo' ); ?></p>
<?php
		endif;

	endif; // Check for have_comments().

	comment_form();
	?>

</div><!-- #comments -->