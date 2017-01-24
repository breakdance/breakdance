# Reboot · Bootstrap

[Skip to main content](#content) [Bootstrap](/)

* [Bootstrap](/)
* [Documentation](/getting-started/introduction/)
* [Examples](/examples/)
* [Themes](https://themes.getbootstrap.com)
* [Expo](https://expo.getbootstrap.com)
* [Blog](https://blog.getbootstrap.com)

# Content

Styles for displaying content with some of the most commonly used HTML elements, including normalization, typography, images, tables, and more.

[Getting started](/getting-started/introduction)

* [Introduction](/getting-started/introduction/)
* [Download](/getting-started/download/)
* [Contents](/getting-started/contents/)
* [Browsers & devices](/getting-started/browsers-devices/)
* [JavaScript](/getting-started/javascript/)
* [Options](/getting-started/options/)
* [Flexbox](/getting-started/flexbox/)
* [Build tools](/getting-started/build-tools/)
* [Best practices](/getting-started/best-practices/)
* [Accessibility](/getting-started/accessibility/)

[Layout](/layout/overview)

* [Overview](/layout/overview/)
* [Grid](/layout/grid/)
* [Flexbox grid](/layout/flexbox-grid/)
* [Media object](/layout/media-object/)
* [Responsive utilities](/layout/responsive-utilities/)

[Content](/content/reboot)

* [Reboot](/content/reboot/)
* [Typography](/content/typography/)
* [Code](/content/code/)
* [Images](/content/images/)
* [Tables](/content/tables/)
* [Figures](/content/figures/)

[Components](/components/alerts)

* [Alerts](/components/alerts/)
* [Breadcrumb](/components/breadcrumb/)
* [Buttons](/components/buttons/)
* [Button group](/components/button-group/)
* [Card](/components/card/)
* [Carousel](/components/carousel/)
* [Collapse](/components/collapse/)
* [Dropdowns](/components/dropdowns/)
* [Forms](/components/forms/)
* [Input group](/components/input-group/)
* [Jumbotron](/components/jumbotron/)
* [List group](/components/list-group/)
* [Modal](/components/modal/)
* [Navs](/components/navs/)
* [Navbar](/components/navbar/)
* [Pagination](/components/pagination/)
* [Popovers](/components/popovers/)
* [Progress](/components/progress/)
* [Scrollspy](/components/scrollspy/)
* [Tag](/components/tag/)
* [Tooltips](/components/tooltips/)

[Utilities](/utilities/borders)

* [Borders](/utilities/borders/)
* [Clearfix](/utilities/clearfix/)
* [Close icon](/utilities/close-icon/)
* [Colors](/utilities/colors/)
* [Display property](/utilities/display-property/)
* [Image replacement](/utilities/image-replacement/)
* [Invisible content](/utilities/invisible-content/)
* [Responsive helpers](/utilities/responsive-helpers/)
* [Screenreaders](/utilities/screenreaders/)
* [Sizing and positioning](/utilities/sizing-and-positioning/)
* [Spacing](/utilities/spacing/)
* [Typography](/utilities/typography/)
* [Vertical align](/utilities/vertical-align/)

[About](/about/history)

* [History](/about/history/)
* [Team](/about/team/)
* [Brand](/about/brand/)
* [License](/about/license/)
* [Translations](/about/translations/)

[Migration](/migration/)

# Reboot

Part of Bootstrap’s job is to provide an elegant, consistent, and simple baseline to build upon. We use Reboot, a collection of element-specific CSS changes in a single file, to kickstart that.

Reboot builds upon Normalize, providing many HTML elements with somewhat opinionated styles using only element selectors. Additional styling is done only with classes. For example, we reboot some `<table>` styles for a simpler baseline and later provide `.table`, `.table-bordered`, and more.

## Contents

* [Contents](#contents)
* [Approach](#approach)
* [Page defaults](#page-defaults)
* [Native font stack](#native-font-stack)
* [Headings and paragraphs](#headings-and-paragraphs)
* [Lists](#lists)
* [Preformatted text](#preformatted-text)
* [Tables](#tables)
* [Forms](#forms)
* [Misc elements](#misc-elements)
  - [Address](#address)
  - [Blockquote](#blockquote)
  - [Inline elements](#inline-elements)
* [HTML5 `[hidden]` attribute](#html5-hidden-attribute)
* [Click delay optimization for touch](#click-delay-optimization-for-touch)

## Approach

Here are our guidelines and reasons for choosing what to override in Reboot:

* Update some browser default values to use `rem`s instead of `em`s for scalable component spacing.
* Avoid `margin-top`. Vertical margins can collapse, yielding unexpected results. More importantly though, a single direction of `margin` is a simpler mental model.
* For easier scaling across device sizes, block elements should use `rem`s for `margin`s.
* Keep declarations of `font` -related properties to a minimum, using `inherit` whenever possible.

## Page defaults

The `<html>` and `<body>` elements are updated to provide better page-wide defaults. More specifically:

* The `box-sizing` is globally set on every element—including `*:before` and `*:after`, to `border-box`. This ensures that the declared width of element is never exceeded due to padding or border.
* A base `font-size: 16px` is declared on the `<html>` and `font-size: 1rem` on the `<body>` for easy responsive type-scaling via media queries.
* The `<body>` also sets a global `font-family` and `line-height`. This is inherited later by some form elements to prevent font inconsistencies.
* For safety, the `<body>` has a declared `background-color`, defaulting to `#fff`.

## Native font stack

The default web fonts (Helvetica Neue, Helvetica, and Arial) have been dropped in Bootstrap 4 and replaced with a “native font stack” for optimum text rendering on every device and OS. Read more about [native font stacks in this _Smashing Magazine_ article](https://www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/).

```sass
$font-family-sans-serif:
  // Safari for OS X and iOS (San Francisco)
  -apple-system,
  // Chrome for OS X (San Francisco)
  BlinkMacSystemFont,
  // Windows
  "Segoe UI",
  // Android
  "Roboto",
  // Basic web fallback
  "Helvetica Neue", Arial, sans-serif !default;
```

This `font-family` is applied to the `<body>` and automatically inherited globally throughout Bootstrap. To switch the global `font-family`, update `$font-family-base` and recompile Bootstrap.

## Headings and paragraphs

All heading elements—e.g., `<h1>` —and `<p>` are reset to have their `margin-top` removed. Headings have `margin-bottom: .5rem` added and paragraphs `margin-bottom: 1rem` for easy spacing.

# h1 heading

Curabitur blandit tempus porttitor. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.

## h2 heading

Curabitur blandit tempus porttitor. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.

### h3 heading

Curabitur blandit tempus porttitor. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.

#### h4 heading

Curabitur blandit tempus porttitor. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.

##### h5 heading

Curabitur blandit tempus porttitor. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.

###### h6 heading

Curabitur blandit tempus porttitor. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.

## Lists

All lists— `<ul>`, `<ol>`, and `<dl>` —have their `margin-top` removed and a `margin-bottom: 1rem`. Nested lists have no `margin-bottom`.

* Lorem ipsum dolor sit amet
* Consectetur adipiscing elit
* Integer molestie lorem at massa
* Facilisis in pretium nisl aliquet
* Nulla volutpat aliquam velit
  - Phasellus iaculis neque
  - Purus sodales ultricies
  - Vestibulum laoreet porttitor sem
  - Ac tristique libero volutpat at
* Faucibus porta lacus fringilla vel
* Aenean sit amet erat nunc
* Eget porttitor lorem

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa
4. Facilisis in pretium nisl aliquet
5. Nulla volutpat aliquam velit
6. Faucibus porta lacus fringilla vel
7. Aenean sit amet erat nunc
8. Eget porttitor lorem

For simpler styling, clear hierarchy, and better spacing, description lists have updated `margin`s. `<dd>`s reset `margin-left` to `0` and add `margin-bottom: .5rem`. `<dt>`s are **bolded**.

<dl><dt>Description lists</dt><dd>A description list is perfect for defining terms.</dd><dt>Euismod</dt><dd>Vestibulum id ligula porta felis euismod semper eget lacinia odio sem.</dd><dd>Donec id elit non mi porta gravida at eget metus.</dd><dt>Malesuada porta</dt><dd>Etiam porta sem malesuada magna mollis euismod.</dd></dl>

## Preformatted text

The `<pre>` element is reset to remove its `margin-top` and use `rem` units for its `margin-bottom`.

```
.example-element {
  margin-bottom: 1rem;
}
```

## Tables

Tables are slightly adjusted to style `<caption>`s, collapse borders, and ensure consistent `text-align` throughout. Additional changes for borders, padding, and more come with [the `.table` class](/content/tables/).

<caption>This is an example table, and this is its caption to describe the contents.</caption>
| Table heading | Table heading | Table heading | Table heading | 
| --- | --- | --- | --- | 
| Table cell | Table cell | Table cell | Table cell | 
| Table cell | Table cell | Table cell | Table cell | 
| Table cell | Table cell | Table cell | Table cell | 

## Forms

Various form elements have been rebooted for simpler base styles. Here are some of the most notable changes:

* `<fieldset>s have no borders, padding, or margin so they can be easily used as wrappers for individual inputs or groups of inputs.`s have no borders, padding, or margin so they can be easily used as wrappers for individual inputs or groups of inputs.
* `<legend>s, like fieldsets, have also been restyled to be displayed as a heading of sorts.`s, like fieldsets, have also been restyled to be displayed as a heading of sorts.
* `<label>s are set to display: inline-block to allow margin to be applied.`s are set to `<label>s are set to display: inline-block to allow margin to be applied.` to allow `<label>s are set to display: inline-block to allow margin to be applied.` to be applied.
* `<input>s, <select>s, <textarea>s, and <button>s are mostly addressed by Normalize, but Reboot removes their margin and sets line-height: inherit, too.`s, `<input>s, <select>s, <textarea>s, and <button>s are mostly addressed by Normalize, but Reboot removes their margin and sets line-height: inherit, too.`s, `<input>s, <select>s, <textarea>s, and <button>s are mostly addressed by Normalize, but Reboot removes their margin and sets line-height: inherit, too.`s, and `<input>s, <select>s, <textarea>s, and <button>s are mostly addressed by Normalize, but Reboot removes their margin and sets line-height: inherit, too.`s are mostly addressed by Normalize, but Reboot removes their `<input>s, <select>s, <textarea>s, and <button>s are mostly addressed by Normalize, but Reboot removes their margin and sets line-height: inherit, too.` and sets `<input>s, <select>s, <textarea>s, and <button>s are mostly addressed by Normalize, but Reboot removes their margin and sets line-height: inherit, too.`, too.
* `<textarea>s are modified to only be resizable vertically as horizontal resizing often “breaks” page layout.`s are modified to only be resizable vertically as horizontal resizing often “breaks” page layout.

These changes, and more, are demonstrated below.

## Misc elements

### Address

The `<address>` element is updated to reset the browser default `font-style` from `italic` to `normal`. `line-height` is also now inherited, and `margin-bottom: 1rem` has been added. `<address>`s are for presenting contact information for the nearest ancestor (or an entire body of work). Preserve formatting by ending lines with `<br>`.

<address>
**Twitter, Inc.**

<br>

    1355 Market St, Suite 900

<br>

    San Francisco, CA 94103

<br>

<abbr title="Phone">P:</abbr> (123) 456-7890

</address>

<address>
**Full Name**

<br>

[[email protected]](/cdn-cgi/l/email-protection#e6c5)
</address>

### Blockquote

The default `margin` on blockquotes is `1em 40px`, so we reset that to `0 0 1rem` for something more consistent with other elements.

> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
Someone famous in Source Title

### Inline elements

The `<abbr>` element receives basic styling to make it stand out amongst paragraph text.
Nulla<abbr>attr</abbr> vitae elit libero, a pharetra augue.

## HTML5 `[hidden]` attribute

HTML5 adds [a new global attribute named `[hidden]`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden), which is styled as `display: none` by default. Borrowing an idea from [PureCSS](http://purecss.io), we improve upon this default by making `[hidden] { display: none !important; }` to help prevent its `display` from getting accidentally overridden. While `[hidden]` isn’t natively supported by IE9-10, the explicit declaration in our CSS gets around that problem.

```html
<input type="text" hidden>
```

#### jQuery incompatibility

`[hidden]` is not compatible with jQuery’s `$(...).hide()` and `$(...).show()` methods. This could potentially change in jQuery 3, but we’re not holding our breath. Therefore, we don’t currently especially endorse `[hidden]` over other techniques for managing the `display` of elements.

To merely toggle the visibility of an element, meaning its `display` is not modified and the element can still affect the flow of the document, use [the `.invisible` class](/utilities/invisible-content/) instead.

## Click delay optimization for touch

Traditionally, browsers on touchscreen devices have a delay of approximately 300ms between the end of a “tap” – the moment when a finger/stylus is lifted from screen – and the [`click` event](https://developer.mozilla.org/en-US/docs/Web/Events/click) being fired. This delay is necessary for these browsers to correctly handle “double-tap to zoom” gestures without prematurely triggering actions or links after the first “tap”, but it can make your site feel slightly sluggish and unresponsive.

Most mobile browsers automatically optimize away this 300ms delay for sites that use the `width=device-width` property as part of their [responsive meta tag](/getting-started/introduction/#responsive-meta-tag) (as well as for sites that disable zooming, for instance with `user-scalable=no`, though this practice is strongly discouraged for accessibility and usability reasons). The biggest exceptions here are IE11 on Windows Phone 8.1, and iOS Safari (and any other iOS WebView-based browser) [prior to iOS 9.3](https://webkit.org/blog/5610/more-responsive-tapping-on-ios/).

On touch-enabled laptop/desktop devices, IE11 and Microsoft Edge are currently the only browsers with “double-tap to zoom” functionality. As the [responsive meta tag](/getting-started/introduction/#responsive-meta-tag) is ignored by all desktop browsers, using `width=device-width` will have no effect on the 300ms delay here.

To address this problem in IE11 and Microsoft Edge on desktop, as well as IE11 on Windows Phone 8.1, Bootstrap explicitly uses the [`touch-action:manipulation` CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action) on all interactive elements (such as buttons and links). This property essentially disables double-tap functionality on those elements, eliminating the 300ms delay.

In the case of old iOS versions (prior to 9.3), the suggested approach is to use additional scripts such as [FastClick](https://github.com/ftlabs/fastclick) to explicitly work around the delay.

For further details, see the compatibility table for [suppressing 300ms delay for touchscreen interactions](https://patrickhlauke.github.io/touch/tests/results/#suppressing-300ms-delay).

* [GitHub](https://github.com/twbs/bootstrap)
* [Twitter](https://twitter.com/getbootstrap)
* [Examples](/examples/)
* [About](/about/history/)

Designed and built with all the love in the world by [@mdo](https://twitter.com/mdo) and [@fat](https://twitter.com/fat). Maintained by the [core team](https://github.com/orgs/twbs/people) with the help of [our contributors](https://github.com/twbs/bootstrap/graphs/contributors).

Currently v4.0.0-alpha.5. Code licensed [MIT](https://github.com/twbs/bootstrap/blob/master/LICENSE), docs [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/).
