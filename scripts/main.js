const mainApp = document.querySelector('main');
const navMenuBtn = document.querySelector('.menu-btn');
const closeNavMenuBtn = document.querySelector('.close-menu-btn');
const mobileNavMenu = document.querySelector('.mobile-nav-menu');
const navMenu = document.querySelector('.nav-menu');
const imageSlider = document.querySelector('.product-image-slider');
const mainImages = document.querySelectorAll('.main-image img');
const subimages = document.querySelectorAll('.subimages img');
const overly = document.querySelector('.overly');
const plusBtn = document.querySelector('.plus');
const countHolder = document.querySelector('.count-area .count');
const minusBtn = document.querySelector('.minus');
const cartBtn = document.querySelector('.cart-icon');
const productCount = document.querySelector('.product-count');
const addToCartBtn = document.querySelector('.add-to-cart');
const cart = document.querySelector('.cart');
const phoneNextbtn = document.querySelector('.main-image .next-btn');
const phonePrevbtn = document.querySelector('.main-image .prev-btn');

/* Nav menu in phone */
const toggleMobileMenu = () => {
  mobileNavMenu.classList.toggle('active');
  mobileNavMenu.appendChild(navMenu);
};

[navMenuBtn, closeNavMenuBtn].forEach((item) => {
  item.addEventListener('click', toggleMobileMenu);
});

/* Slider images */
const switchImage = (images, img, index) => {
  if (img.parentElement.querySelector('.active')) {
    img.parentElement.querySelector('.active').classList.remove('active');
  }
  img.classList.add('active');
  images.forEach((mainImg) => {
    mainImg.style.transform = `translate(${-100 * index}%)`;
  });
};

subimages.forEach((img, index) => img.addEventListener('click', () => switchImage(mainImages, img, index)));

/* Floar Slider images */
const floatSlider = (append) => {
  const cloneSlider = imageSlider.cloneNode(true);
  cloneSlider.classList.add('float-image-slider');

  const nextBtn = document.createRange().createContextualFragment(
    '<div class="icon-next"> <svg  width="13" height="18" xmlns="http://www.w3.org/2000/svg"><path d="m2 1 8 8-8 8" stroke="#1D2026" stroke-width="3" fill="none" fill-rule="evenodd"/></svg> </div>',
  );
  const prevBtn = document.createRange().createContextualFragment(
    '<div class="icon-prev"> <svg  width="12" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M11 1 3 9l8 8" stroke="#1D2026" stroke-width="3" fill="none" fill-rule="evenodd"/></svg> </div>',
  );
  const closeBtn = document.createRange().createContextualFragment(
    '<div class="icon-close">×</div>',
  );

  cloneSlider.querySelector('.main-image').append(nextBtn, prevBtn);

  cloneSlider.append(closeBtn);

  if (append) {
    if (!mainApp.querySelector('.float-image-slider')) {
      mainApp.appendChild(cloneSlider);
      overly.classList.add('active');
    }
  } else if (mainApp.querySelector('.float-image-slider')) {
    mainApp.querySelector('.float-image-slider').remove();
    overly.classList.remove('active');
  }
};

mainImages.forEach((image) => image.addEventListener('click', () => floatSlider(true)));
mainApp.addEventListener('click', (e) => {
  /* Remove the float slider */
  if (e.target.classList.contains('icon-close')) {
    floatSlider(false);
  }
});

/* Switch images by next and previous buttons */
const switchImagesByButtons = (btn, floatSubimages, images) => {
  let index = Number(floatSubimages[0].parentElement.querySelector('.active').dataset.index);
  if (btn.classList.contains('icon-next')) {
    index = index === floatSubimages.length - 1 ? 0 : index + 1;
    switchImage(images, floatSubimages[index], index);
  } else if (btn.classList.contains('icon-prev')) {
    index = index === 0 ? floatSubimages.length - 1 : index - 1;
    switchImage(images, floatSubimages[index], index);
  }
};

/* This API watches mainApp for changes in its children and triggers functions inside. */
const observer = new MutationObserver((() => {
  const floatMainImages = document.querySelectorAll('.float-image-slider .main-image img');
  const floatSubimages = document.querySelectorAll('.float-image-slider .subimages img');
  const nextBtn = document.querySelector('.icon-next');
  const prevBtn = document.querySelector('.icon-prev');

  floatSubimages.forEach((img, index) => img.addEventListener('click', () => switchImage(floatMainImages, img, index)));

  [nextBtn, prevBtn].forEach((btn) => { if (btn) btn.addEventListener('click', (e) => switchImagesByButtons(e.currentTarget, floatSubimages, floatMainImages)); });
}));

observer.observe(mainApp, { childList: true });

/* Add to card process */
const plusCount = () => {
  let count = Number(countHolder.textContent);
  if (count < 100) count += 1;
  countHolder.textContent = count;
};
const minusCount = () => {
  let count = Number(countHolder.textContent);
  if (count > 0) count -= 1;
  countHolder.textContent = count;
};

plusBtn.addEventListener('click', plusCount);
minusBtn.addEventListener('click', minusCount);
cartBtn.addEventListener('click', () => cartBtn.classList.toggle('active'));
addToCartBtn.addEventListener('click', () => {
  const count = Number(productCount.textContent) + Number(countHolder.textContent);

  if (count > 0) {
    productCount.textContent = count;
    productCount.classList.add('active');
    if (!cart.querySelector('.products')) {
      const products = document.createRange().createContextualFragment(`
      <div class="products">
      <div class="cart-product main-flex">
        <div class="image">
          <img src="images/image-product-1-thumbnail.jpg">
        </div>
        <div class="info">
          <div class="model">Fall limited edition sneakers</div>
          <div class="price">$125.00 × <span class="count">${count}</span> <strong class="total-price">$${125 * count}.00</strong>
          </div>
        </div>
        <div class="delete-btn" onclick="deleteProducts()">
          <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs>
              <path
                d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z"
                id="a" />
            </defs>
            <use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a" />
          </svg>
        </div>
      </div>
      </div>`);
      const checkoutBtn = document.createRange().createContextualFragment('<button onclick="deleteProducts()" class="checkout">checkout</button>');
      cart.querySelector('.empty').style.display = 'none';

      cart.append(products, checkoutBtn);
    } else {
      cart.querySelector('.products .count').textContent = count;
      cart.querySelector('.products .total-price').textContent = `$${125 * count}.00`;
    }
  }
  countHolder.textContent = 0;
});

// eslint-disable-next-line no-unused-vars
const deleteProducts = () => {
  cart.querySelector('.products').remove();
  cart.querySelector('.checkout').remove();
  cart.querySelector('.empty').style.display = 'block';
  productCount.textContent = 0;
  productCount.classList.remove('active');
  cartBtn.classList.remove('active');
};

/* Slider images in phone */
phoneNextbtn.addEventListener('click', () => {
  let index = Number(subimages[0].parentElement.querySelector('.active').dataset.index);
  index = index === subimages.length - 1 ? 0 : index + 1;
  switchImage(mainImages, subimages[index], index);
});
phonePrevbtn.addEventListener('click', () => {
  let index = Number(subimages[0].parentElement.querySelector('.active').dataset.index);
  index = index === 0 ? subimages.length - 1 : index - 1;
  switchImage(mainImages, subimages[index], index);
});
