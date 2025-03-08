window.HELP_IMPROVE_VIDEOJS = false;

var NUM_INTERP_FRAMES = 13;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + '${i}' + '.png';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}


function setInterpolationImage(slider, i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };

  var wrapper = $(slider).closest(".interpolation-panel").find(".interpolation-image-wrapper");
  wrapper.empty().append(image);
}


$(document).ready(function() {
  $(".interpolation-panel").each(function() {
      var panel = $(this);
      var folder = panel.attr("data-folder"); 
      var slider = panel.find(".interpolation-slider");
      var wrapper = panel.find(".interpolation-image-wrapper");

      // 폴더별 프레임 개수 지정
      var folderFrameCounts = {
          "morphed01": 13,
          "morphed02": 10,
          "morphed03": 10,
          "morphed04": 13
      };

      var NUM_INTERP_FRAMES = folderFrameCounts[folder] || 13; // 기본값 13
      var interp_images = [];

      for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
          var path = `./static/interpolation/${folder}/${i}.png`;
          interp_images[i] = new Image();
          interp_images[i].src = path;
      }

      function setInterpolationImage(i) {
          if (interp_images[i]) {
              var image = interp_images[i];
              image.ondragstart = function() { return false; };
              image.oncontextmenu = function() { return false; };
              wrapper.empty().append(image);
          } else {
              wrapper.html("<p style='color:red;'>No frame available</p>");
          }
      }

      setInterpolationImage(0);
      slider.prop("max", NUM_INTERP_FRAMES - 1);

      slider.on("input", function() {
          setInterpolationImage(this.value);
      });
  });

  bulmaSlider.attach();
});