# Frontend Mentor - E-commerce product page solution

This is a solution to the [E-commerce product page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ecommerce-product-page-UPsZ9MJp6).

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Open a lightbox gallery by clicking on the large product image
- Switch the large product image by clicking on the small thumbnail images
- Add items to the cart
- View the cart and remove items from it

### Screenshot

![screenshot in laptop](./laptop_screenshot.jpg)

![screenshot in mobile](./mobile_screenshot.jpg)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- JavaScript

### What I learned

I've learned a lot, and one of the most fascinating things I've come across in this experience is the MutationObserver API. In simple terms, this API allows you to choose a target element (like a div or a paragraph) and monitor it for any changes in its children or attributes, depending on what you choose to observe. When a change occurs, you can specify actions to be taken.

Here's how I used this API in my code:

```javascript
const observer = new MutationObserver(() => {
  const floatMainImages = document.querySelectorAll('.float-image-slider .main-image img');
  const floatSubimages = document.querySelectorAll('.float-image-slider .subimages img');
  const nextBtn = document.querySelector('.icon-next');
  const prevBtn = document.querySelector('.icon-prev');

  floatSubimages.forEach((img, index) => img.addEventListener('click', () => switchImage(floatMainImages, img, index));

  [nextBtn, prevBtn].forEach((btn) => { if (btn) btn.addEventListener('click', (e) => switchImagesByButtons(e.currentTarget, floatSubimages, floatMainImages)); });
});

observer.observe(mainApp, { childList: true });
```

You can find more information on this concept by visiting this URL: [MutationObserver - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver).

## Author

- Frontend Mentor - [@Ayoubrabiae](https://www.frontendmentor.io/profile/Ayoubrabiae)
- Linkedin - [Ayoub RABIYA](https://www.linkedin.com/in/ayoub-rabiya/)
