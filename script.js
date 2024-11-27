var shoppingCart = (function () {
  cart = [];

  function Item(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
  }

  function savecart() {
    sessionStorage.setItem("shoppingCart", JSON.stringify(cart));
  }

  function loadcart() {
    cart = JSON.parse(sessionStorage.getItem("shoppingCart"));
  }
  if (sessionStorage.getItem("shoppingCart") != null) {
    loadcart();
  }

  var obj = {};

  obj.additemtocart = function (name, price, count) {
    for (var item in cart) {
      if (cart[item].name === name) {
        cart[item].count++;
        savecart();
        return;
      }
    }
    var item = new Item(name, price, count);
    cart.push(item);
    savecart();
  };

  obj.removeitemfromcart = function (name) {
    for (var item in cart) {
      if (cart[item].name === name) {
        cart[item].count--;
        if (cart[item].count === 0) {
          cart.splice(item, 1);
        }
        break;
      }
    }
    savecart();
  };

  obj.removeitemfromcartall = function (name) {
    for (var item in cart) {
      if (cart[item].name === name) {
        cart.splice(item, 1);
        break;
      }
    }
    savecart();
  };

  obj.clearcart = function () {
    cart = [];
    savecart();
  };

  obj.totalcart = function () {
    var totalcart = 0;
    for (var item in cart) {
      totalcart += cart[item].price * cart[item].count;
    }
    return Number(totalcart.toFixed(2));
  };

  return obj;
})();

var clearcart = document.querySelector(".clear-cart");
var showcart = document.querySelector(".show-cart");
var totalcart = document.querySelector(".total-cart");

document.querySelectorAll(".add-to-cart").forEach(function (element) {
  element.addEventListener("click", function (event) {
    event.preventDefault();
    var name = this.getAttribute("data-name");
    var price = Number(this.getAttribute("data-price"));
    shoppingCart.additemtocart(name, price, 1);
    displaycart();
  });
});

if (clearcart) {
  clearcart.addEventListener("click", function () {
    shoppingCart.clearcart();
    displaycart();
  });
}

function displaycart() {
  let shoppingCartString = sessionStorage.getItem("shoppingCart");
  var cartArray = JSON.parse(shoppingCartString);
  if (cartArray == null) {
    cartArray = [];
  }
  var output = "";
  cartArray.forEach(function (item) {
    output +=
      "<div class='cart-row'>" +
      "<p class='item-name-price'>" + item.name +"  (" +item.price + "KM)  " + item.count +"x </p>" +
      "<button class='minus-item input-group-addon btn btn-primary' data-name='" + item.name + "'>-</button>" +
      "<button class='plus-item btn btn-primary input-group-addon' data-name='" + item.name + "'>+</button>" +
      "<p class='item-total'>" + item.price * item.count + "KM</p>" +
      "<button class='delete-item btn btn-danger' data-name='" + item.name + "'>X</button>" +
      "</div>" +
      "<hr>";
  });
  if (showcart) {
    showcart.innerHTML = output;
  }
  if (totalcart) {
    totalcart.innerHTML = shoppingCart.totalcart();
  }
}

if (showcart) {
  showcart.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-item")) {
      var name = event.target.getAttribute("data-name");
      shoppingCart.removeitemfromcartall(name);
      displaycart();
    }
  });
  showcart.addEventListener("click", function (event) {
    if (event.target.classList.contains("minus-item")) {
      var name = event.target.getAttribute("data-name");
      shoppingCart.removeitemfromcart(name);
      displaycart();
    }
  });
  showcart.addEventListener("click", function (event) {
    if (event.target.classList.contains("plus-item")) {
      var name = event.target.getAttribute("data-name");
      shoppingCart.additemtocart(name);
      displaycart();
    }
  });
}

displaycart();

var cartbutton = document.getElementById("cartbutton");
var modal = document.getElementById("cart");
var closeicon = document.getElementById("closemodal");

if (cartbutton) {
  cartbutton.addEventListener("click", function () {
    modal.style.display = "block";
  });
}

if (modal) {
  closeicon.addEventListener("click", function () {
    modal.style.display = "none";
  });
}
var totalcart2 = document.querySelector(".total-cart2");
var coupon = document.getElementById("coupon");
if (coupon) {
  coupon.addEventListener("input", (event) => {
    const inputvalue = event.target.value.toLowerCase();
    const coupon1 = "1234";
    const coupon2 = "tptp";
    if (inputvalue === coupon2.toLowerCase()) {
      coupon.style.borderBottom = "1px solid green";
      totalcart2.innerHTML = (shoppingCart.totalcart() * 0.7).toFixed(2);
    } else if (inputvalue === coupon1.toLowerCase()) {
      coupon.style.borderBottom = "1px solid green";
      totalcart2.innerHTML = (shoppingCart.totalcart() * 0.95).toFixed(2);
    } else {
      coupon.style.borderBottom = "1px solid red";
      totalcart2.innerHTML = shoppingCart.totalcart();
    }
  });
}
var form2 = document.querySelector(".form2");
var naruci2 = document.getElementById("naruci2");
if (naruci2) {
  naruci2.addEventListener("click", function (event) {
    event.preventDefault();

    document.querySelectorAll(".input").forEach((element) => {
      element.style.borderBottom = "1px solid #000";
    });

    document.querySelector(".submit-error").textContent = "";

    let firstName = document.getElementById("first-name");
    let lastName = document.getElementById("last-name");
    let phoneNum = document.getElementById("phone-num");
    let adress = document.getElementById("adress");

    let isValid = true;

    if (firstName.value.trim() === "") {
      isValid = false;
      firstName.style.borderBottom = "1px solid red";
    }

    if (lastName.value.trim() === "") {
      isValid = false;
      lastName.style.borderBottom = "1px solid red";
    }

    if (phoneNum.value.trim() === "") {
      isValid = false;
      phoneNum.style.borderBottom = "1px solid red";
    } else {
      let phonePattern = /^\d{9}$/;
      if (!phonePattern.test(phoneNum.value)) {
        isValid = false;
        phoneNum.style.borderBottom = "1px solid red";
      }
    }

    if (adress.value.trim() === "") {
      isValid = false;
      adress.style.borderBottom = "1px solid red";
    }

    if (isValid) {
      alert("Uspješno ste naručili");
      modal2.style.display = "none";
      shoppingCart.clearcart();
      displaycart();
    } else {
      document.querySelector(".submit-error").textContent =
        "Sva polja moraju biti ispunjena!";
    }
  });
}

var naruci = document.getElementById("naruci");
var modal2 = document.getElementById("form2");
var closeicon2 = document.getElementById("closemodal2");

if (modal2) {
  naruci.addEventListener("click", function () {
    let shoppingCartString = sessionStorage.getItem("shoppingCart");
    let cartArray = JSON.parse(shoppingCartString);
    if (cartArray.length == 0) {
      alert("Korpa vam je prazna!");
      modal.style.display = "none";
    } else {
      modal2.style.display = "block";
      modal.style.display = "none";
      totalcart2.innerHTML = shoppingCart.totalcart();
    }
  });
}

if (closeicon2) {
  closeicon2.addEventListener("click", function () {
    modal2.style.display = "none";
  });
}

const slider = document.querySelector(".slider");

function activate(e) {
  const items = document.querySelectorAll(".item");
  e.target.matches(".next") && slider.append(items[0]);
  e.target.matches(".prev") && slider.prepend(items[items.length - 1]);
}

document.addEventListener("click", activate, false);

const smBtnLeft = document.querySelector(".sm-btn-left");
const sideMenuLeft = document.querySelector(".sm-left");
const text = document.querySelector(".rotate");

if (smBtnLeft) {
  smBtnLeft.addEventListener("click", () => {
    sideMenuLeft.classList.toggle("active");
    smBtnLeft.classList.toggle("active");
    if (text.textContent.trim() === "TIM") {
      text.textContent = "ZATVORI";
    } else {
      text.textContent = "TIM";
    }
  });
}

const smBtnRight = document.querySelector(".sm-btn-right");
const sideMenuRight = document.querySelector(".sm-right");
const text2 = document.querySelector(".rotate2");

if (smBtnRight) {
  smBtnRight.addEventListener("click", () => {
    sideMenuRight.classList.toggle("active");
    smBtnRight.classList.toggle("active");
    if (text2.textContent.trim() === "PARTNERI") {
      text2.textContent = "ZATVORI";
    } else {
      text2.textContent = "PARTNERI";
    }
  });
}

var videomodal = document.getElementById("videomodal");
var img = document.querySelector(".video");

if (videomodal) {
  img.onclick = function () {
    videomodal.style.display = "flex";
    document.getElementById("youtube").src =
      "https://www.youtube.com/embed/jiwSvZ8Nvlo";
  };
  window.onclick = function (event) {
    if (event.target == videomodal) {
      videomodal.style.display = "none";
      document.getElementById("youtube").src = "";
    }
  };
}
