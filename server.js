const file_input = document.querySelector("#images");
const fwlr = document.querySelector("#fwlr");
const fwtb = document.querySelector("#fwtb");
const fw = document.querySelector("#fw");
const frame_check = document.querySelector("#frame_check");
const saturation = document.querySelector("#saturation");
const solid_color = document.querySelector("#pick_color_1");
const grad_1 = document.querySelector("#pick_color_2");
const grad_2 = document.querySelector("#pick_color_3");
const add_shadow = document.querySelector("#add_shadow");
const frame_color = document.querySelector("#frame_color");
const download = document.querySelector(".done");
const blur_ad = document.querySelector("#blur");
const png_dwn = document.querySelector("#png_download");
const jpg_dwn = document.querySelector("#jpeg_download");
const img_width = document.querySelector("#image_width");
const img_height = document.querySelector("#image_height");
const canvas = document.querySelector(".mycanvas");
const ctx1 = canvas.getContext("2d");
const ctx = canvas.getContext("2d");
const ctx2 = canvas.getContext("2d");


let activeImage, image, originalWidthToHeightRatio;


const add_frame = function (
  i,
  i_left,
  i_top,

  i_width,
  i_height,
  blurr,
  thickness,
  frame_color,
  saturation,
  frame_yes,
  shadow_yes
) {
  ctx1.filter = `blur(${blurr}px)`;
  ctx1.drawImage(i, 0, 0, canvas.width, canvas.height);

  if (shadow_yes == true) {
    console.log(shadow_yes);
    ctx2.shadowColor = `${frame_color}`;
    ctx2.shadowBlur = 15;
    ctx2.globalCompositeOperation = "source-over";
  } else {
    ctx2.shadowBlur = 0;
    ctx2.globalCompositeOperation = "source-over";
  }

  if (frame_yes == true) {
    ctx2.fillStyle = `${frame_color}`;
    ctx2.fillRect(
      i_left - 1 * thickness,
      i_top - 0.5 * thickness,
      i_width + 2 * thickness,
      i_height + 1 * thickness
    );
    ctx2.globalCompositeOperation = "source-over";
  }

  ctx.filter = `blur(0px)`;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  if (saturation == true) {
    ctx.globalCompositeOperation = "saturation";
  }
  ctx.drawImage(i, i_left, i_top, i_width, i_height);
};

file_input.addEventListener("change", (e) => {
  e.preventDefault();
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    openImage(reader.result);
  });
  reader.readAsDataURL(e.target.files[0]);
});

let cz = 0;
let cy = 0;
let hg = canvas.height;
let wd = canvas.width;
let br = 1;
let fwidth = 0;
let f_c = 0;
let saturation_c,
  f_cc,
  shadow = false;

const with_frame = function () {
  activeImage.addEventListener("load", () => {
    console.log(activeImage.width, activeImage.height);

    fwlr.addEventListener("input", function () {
      cz = (+this.value * canvas.width) / 100;
      add_frame(
        activeImage,
        cz,
        cy,
        wd,
        hg,
        br,
        fwidth,
        f_c,
        saturation_c,
        f_cc,
        shadow
      );
    });

    fwtb.addEventListener("input", function () {
      cy = (+this.value * canvas.height) / 100;
      add_frame(
        activeImage,
        cz,
        cy,
        wd,
        hg,
        br,
        fwidth,
        f_c,
        saturation_c,
        f_cc,
        shadow
      );
    });

    img_height.addEventListener("input", function () {
      hg = (+this.value * activeImage.height) / 100;
      add_frame(
        activeImage,
        cz,
        cy,
        wd,
        hg,
        br,
        fwidth,
        f_c,
        saturation_c,
        f_cc,
        shadow
      );
    });

    img_width.addEventListener("input", function () {
      wd = (+this.value * activeImage.width) / 100;
      add_frame(
        activeImage,
        cz,
        cy,
        wd,
        hg,
        br,
        fwidth,
        f_c,
        saturation_c,
        f_cc,
        shadow
      );
    });

    blur_ad.addEventListener("input", function () {
      br = (+this.value * activeImage.width) / 100;
      add_frame(
        activeImage,
        cz,
        cy,
        wd,
        hg,
        br,
        fwidth,
        f_c,
        saturation_c,
        f_cc,
        shadow
      );
    });

    frame_check.addEventListener("click", function () {
      f_cc = this.checked;
      add_frame(
        activeImage,
        cz,
        cy,
        wd,
        hg,
        br,
        fwidth,
        f_c,
        saturation_c,
        f_cc,
        shadow
      );
    });

    fw.addEventListener("input", function () {
      fwidth = +this.value;
      console.log(fwidth);
      add_frame(
        activeImage,
        cz,
        cy,
        wd,
        hg,
        br,
        fwidth,
        f_c,
        saturation_c,
        f_cc,
        shadow
      );
    });

    solid_color.addEventListener("change", function () {
      f_c = this.value;
      console.log(f_c);
      add_frame(
        activeImage,
        cz,
        cy,
        wd,
        hg,
        br,
        fwidth,
        f_c,
        saturation_c,
        f_cc,
        shadow
      );
    });

    saturation.addEventListener("click", function () {
      console.log(this.checked);
      saturation_c = this.checked;
      add_frame(
        activeImage,
        cz,
        cy,
        wd,
        hg,
        br,
        fwidth,
        f_c,
        saturation_c,
        f_cc,
        shadow
      );
    });

    add_shadow.addEventListener("click", function () {
      shadow = this.checked;
      console.log(shadow, "shadow");
      add_frame(
        activeImage,
        cz,
        cy,
        wd,
        hg,
        br,
        fwidth,
        f_c,
        saturation_c,
        f_cc,
        shadow
      );
    });
  });
};


frame_color.addEventListener("change", function () {
  console.log(this.value);
});

grad_1.addEventListener("change",function(){
  console.log(this.value);
})

grad_2.addEventListener("change",function(){
  console.log(this.value);
})


//open image
function openImage(imageSrc) {
  activeImage = new Image();
  // canvas.width=activeImage.width;
  // canvas.height=activeImage.height;
  with_frame();
  activeImage.src = imageSrc;
}

var url = "";

png_dwn.addEventListener("change", function () {
  url = canvas.toDataURL("image/png");
  console.log(url);
  // url = canvas.toDataURL("image/png");
});

jpg_dwn.addEventListener("change", function () {
  url = canvas.toDataURL("image/jpeg");
  console.log(url);
});

download.addEventListener("click", function (e) {
  this.href = url;
  this.download = "new file";
  console.log(this.href);
});

console.log(saturation.checked);

//"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6WLMxrW6-a1gmwh9HoF8tgOpLXqdJgV5suQ&usqp=CAU";
