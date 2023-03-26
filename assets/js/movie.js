const urlParams = new URLSearchParams(window.location.search);
const language = urlParams.get("lang");
var pageInt = 0;
getMovies(pageInt, language);

var baseUrl = "https://media-content.akamaized.net/";
var drmLicenceUrl = "https://playlicense.mxplay.com/widevine/proxy?content_id=";

function getMovies(pageNo, language) {
  let api =
    "https://api.mxplay.com/v1/web/detail/browseItem?&pageNum=" +
    pageNo +
    "&pageSize=16&isCustomized=true&browseLangFilterIds=" +
    language +
    "&type=1&userid=HOTSTAR%20RANDOM%20ID%20:%201f151757-0147-4261-9cf7-e1abf4cc58cf&platform=com.mxplay.mobile&content-languages=en";

  fetch(api)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
      var jData = data.items;
      for (var i = 0; i < jData.length; i++) {
        var obj = jData[i];
        var title = obj.title;
        var imageLink = baseUrl + obj.imageInfo[2].url;
        var channelCard = document.createElement("div");
        channelCard.className = "col-lg-3 col-md-4 col-sm-6";
        channelCard.id = "--Channel-Card";
        var image = document.createElement("img");
        image.style.width = "100%";
        image.style.height = "80%";
        image.style.borderRadius = "10px";
        image.style.display = "block";
        var anchor = document.createElement("a");
        var channelName = document.createElement("p");
        channelName.style.marginTop = "1px";
        channelName.style.fontSize = "bold";
        channelName.className = "--ChannelName";
        channelName.style.marginTop = "10px";
        channelName.innerHTML = title;
        image.setAttribute("src", imageLink);

        var provider = obj.stream.provider;
        if (provider != "thirdParty") {
          if (!obj.stream.drmProtect) {
            if (obj["stream"][provider]["dash"]["high"] != null) {
              anchor.href =
                "https://itsme.laden.workers.dev/?q=" +
                baseUrl +
                obj["stream"][provider]["dash"]["high"];
            } else {
              anchor.href =
                "https://itsme.laden.workers.dev/?q=" +
                baseUrl +
                obj["stream"][provider]["dash"]["base"];
            }
          } else {
            if (obj["stream"][provider]["dash"]["high"] != null) {
              anchor.href =
                "https://itsme.laden.workers.dev/?q=" +
                obj["stream"][provider]["dash"]["high"] +
                "&lic=" +
                drmLicenceUrl +
                obj["stream"]["videoHash"];
            } else {
              anchor.href =
                "https://itsme.laden.workers.dev/?q=" +
                obj["stream"][provider]["dash"]["base"] +
                "&lic=" +
                drmLicenceUrl +
                obj["stream"]["videoHash"];
            }
          }
        } else {
          if (obj["stream"][provider]["webHlsUrl"] != null) {
            anchor.href =
              "https://itsme.laden.workers.dev/?q=" +
              baseUrl +
              obj["stream"][provider]["webHlsUrl"];
          } else {
            anchor.href =
              "https://itsme.laden.workers.dev/?q=" +
              baseUrl +
              obj["stream"][provider]["hlsUrl"];
          }
        }

        image.className = "TV_Channels";
        anchor.appendChild(image);
        channelCard.appendChild(anchor);
        channelCard.appendChild(channelName);
        document.querySelector(".row").appendChild(channelCard);
      }
    })
    .then(function () { });
}

$(window).on("scroll", function () {
  if (
    $(window).scrollTop() >=
    $(".row").offset().top + $(".row").outerHeight() - window.innerHeight
  ) {
    pageInt += 1;
    getMovies(pageInt, language);
  }
});
