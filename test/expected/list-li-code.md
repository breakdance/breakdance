* Update some browser default values to use `rem`s instead of `em`s for scalable component spacing.
* Avoid `margin-top`. Vertical margins can collapse, yielding unexpected results. More importantly though, a single direction of `margin` is a simpler mental model.
* For easier scaling across device sizes, block elements should use `rem`s for `margin`s.
* Keep declarations of `font`-related properties to a minimum, using `inherit` whenever possible.
