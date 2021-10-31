# Ample Staging RC

# OXYGEN TEMPLATES

# site.com/products

-   This is a products template that displays all the products
-   The advance custom field of this template is "Products"
-   Requirements:
    -   permalink ( done )
    -   breadcrumbs ( done )
    -   show all products ( done )
    -   facet to filter products ( done )
    -   dynamic hierarchy facet filter ( \* yes or no )

# site.com/[product_category_name]/products

-   This is a product category template
-   The advance custom field of this template is "Product Categories" to display the product categories description
-   Requirements:
    -   permalink ( done )
    -   breadcrumbs ( done )
    -   Display Product Categories description ( done )
    -   Display Product of the specific product category ( done )
        ( https://wpdevdesign.com/how-to-modify-wp-grid-builder-query-in-oxygen/ )
    -   dynamic hierarchy facet filter ( \*yes or no )
-   remove "category:" at product archive page ( done )
-   notion record down the documentation.

# Product Single

-   basic structure ( ok )
-   Understand Glightbox Attributes
-   Product Gallery include feature image using PHP
-   GlightBox: Remove zoom icon, and include zoom feature by clicking feature image.
-   flexslider feature on product gallery

Follow guide from WPDevDesign:
Follow Step 1 a-e ( will update this section in detail )
Follow Step 2.
apply parameters from following API
GlightBox for the popup : https://github.com/biati-digital/glightbox
FlexSlider for the slider: https://github.com/woocommerce/FlexSlider/wiki/FlexSlider-Properties
FlexSlider example: http://flexslider.woothemes.com/thumbnail-slider.html

# Header

-   use max mega menu
-   full width
-   padding: 15px 15px 15px 15px;
    width: 100%;
    margin: 20px;
    background-color: greenyellow;
    border-radius: 20px;

# Hero

Text Rotator: Hero Section, flip these words

Example Text:
Enhance your:
business --> website --> online store --> marketing strategies;

# Go with these permalinks:

Shop - /products
Category Archive - /products/architectural-ironmongery
Sub Category Archive - /products/architectural-ironmongery/door-handles
Single - /architectural-ironmongery/door-handles/LH001

16/09/2021

1. Solve permalink issue with the permalink manager pro ( solved )
2. Remove category from archive title ( solved ) - write documentation about that at night
3. Display only category product ()
    - get the variable that indicates the product category of the page that
    - if statement of filter products in the category
    - display the products of that category

22/09/2021

-   dental appointment
-   max mega menu ( 2 hours )
-   lucas's background change color ( 1 hour )
-   bang zang video (20 mins)

To-dos

1. Product Archive / Product Single
2. Project Archive / Project Single
3. 404 Page
4. Home Page (slider, breadcrumb)
5. Refund and Returns Policy
6. Quote List Page && Add to Quote Feature
7. Contact Us (Fluent Form)
8. Search Page ( no need as we are using grid builder )
