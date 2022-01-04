
function recupvideo(part, id, key){
  fetch("https://youtube.googleapis.com/youtube/v3/videos?part=" + part + "&id="+ id +"&key=" + key)
  .then(response => response.json())
  .then(data => {displayv(data)})
  .catch(() => msg.textContent = "It's no good");
}

function recupchannel(part, id, key){
  fetch("https://youtube.googleapis.com/youtube/v3/channels?part=" + part + "&id="+ id +"&key=" + key)
  .then(response => response.json())
  .then(data => {displayc(data)})
  .catch(() => msg.textContent = "It's no good");
}

function displayv(data){
  console.log(data);

  idvid.innerHTML = data.id;

  videobirth.innerHTML = data.snippet.publishedAt;
  chanid.innerHTML = data.snippet.channelId;
  videoname.innerHTML = data.snippet.title;
  videodescription.innerHTML = data.snippet.description;
  videothumbnailimg.innerHTML = data.snippet.thumbnails.maxres.url;
  videothumbnailwidth.innerHTML = data.snippet.thumbnails.maxres.width;
  videothumbnailheight.innerHTML = data.snippet.thumbnails.maxres.height;
  tags.innerHTML = data.snippet.tags;
  categoryid.innerHTML = data.snippet.categoryId;
  broadcast.innerHTML = data.snippet.liveBroadcastContent;

  videolenghth.innerHTML = data.contentDetails.duration;
  videodim.innerHTML = data.contentDetails.dimension;
  captions.innerHTML = data.contentDetails.caption;
  videoTM.innerHTML = data.contentDetails.licensedContent;
  freedom.innerHTML = data.contentDetails.regionRestriction.allowed;
  censor.innerHTML = data.contentDetails.regionRestriction.blocked;
  protecttheyouth.innerHTML = data.contentDetails.contentRating.ytRating;
  videoproj.innerHTML = data.contentDetails.projection;

  videoprivacy.innerHTML = data.status.privacyStatus;
  videolicense.innerHTML = data.status.license;
  videokid.innerHTML = data.status.madeForKids;

  videoviewcount.innerHTML = data.statistics.viewCount;
  videolikecount.innerHTML = data.statistics.likeCount;
  videocommentcount.innerHTML = data.statistics.commentCount;

  liverealstart.innerHTML = data.liveStreamingDetails.actualStartTime;
  liverealend.innerHTML = data.liveStreamingDetails.actualEndTime;
  liveschedstart.innerHTML = data.liveStreamingDetails.scheduledStartTime;
  liveschedend.innerHTML = data.liveStreamingDetails.scheduledEndTime;
}

function displayc(data){
  console.log(data);

  idchan.innerHTML = data.id;

  chanbirth.innerHTML = data.snippet.publishedAt;
  channame.innerHTML = data.snippet.title;
  chandescription.innerHTML = data.snippet.description;
  chanthumbnailimg.innerHTML = data.snippet.thumbnails.high.url;
  chanthumbnailwidth.innerHTML = data.snippet.thumbnails.high.width;
  chanthumbnailheight.innerHTML = data.snippet.thumbnails.high.height;
  chanurl.innerHTML = data.snippet.customUrl;
  chancountry.innerHTML = data.snippet.country;
  chanlang.innerHTML = data.snippet.defaultLanguage;

  chanviewcount.innerHTML = data.statistics.viewCount;
  chansubcount.innerHTML = data.statistics.subscriberCount;
  chanvideocount.innerHTML = data.statistics.videoCount;
}

const idvid = document.querySelector();
const videobirth = document.querySelector();
const chanid = document.querySelector();
const videoname = document.querySelector();
const videodescription = document.querySelector();
const videothumbnailimg = document.querySelector();
const videothumbnailwidth = document.querySelector();
const videothumbnailheight = document.querySelector();
const tags = document.querySelector();
const categoryid = document.querySelector();
const broadcast = document.querySelector();
const videolenghth = document.querySelector();
const videodim = document.querySelector();
const captions = document.querySelector();
const videoTM = document.querySelector();
const freedom = document.querySelector();
const censor = document.querySelector();
const protecttheyouth = document.querySelector();
const videoproj = document.querySelector();
const videoprivacy = document.querySelector();
const videolicense = document.querySelector();
const videokid = document.querySelector();
const videoviewcount = document.querySelector();
const videolikecount = document.querySelector();
const videocommentcount = document.querySelector();
const liverealstart = document.querySelector();
const liverealend = document.querySelector();
const liveschedstart = document.querySelector();
const liveschedend = document.querySelector();

const idchan = document.querySelector();
const chanbirth = document.querySelector();
const channame = document.querySelector();
const chandescription = document.querySelector();
const chanthumbnailimg = document.querySelector();
const chanthumbnailwidth = document.querySelector();
const chanthumbnailheight = document.querySelector();
const chanurl = document.querySelector();
const chancountry = document.querySelector();
const chanlang = document.querySelector();
const chanviewcount = document.querySelector();
const chansubcount = document.querySelector();
const chanvideocount = document.querySelector();
