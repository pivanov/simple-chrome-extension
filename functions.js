updateContext();

function updateContext() {
  chrome.contextMenus.removeAll();
  chrome.contextMenus.create({
    "title": "Add Page",
    "contexts": ["page"],
    "onclick": function(info, tab) {
      postPage(info, tab)
    }
  });
  chrome.contextMenus.create({
    "title": "Add Link",
    "contexts": ["link"],
    "onclick": function(info, tab) {
      postLink(info, tab)
    }
  });
  chrome.contextMenus.create({
    "title": "Add Selection",
    "contexts": ["selection"],
    "onclick": function(info, tab) {
      postText(info, tab)
    }
  });
}


function postText(info, tab) {
  postContent(info, tab, info.selectionText);
}

function postLink(info, tab) {
  postContent(info, tab, info.linkUrl);
}

function postPage(info, tab) {
  postContent(info, tab, info.pageUrl);
}


function postContent(info, tab, link) {
  prm = JSON.stringify({
    "params": {
      "links": [link]
    }
  });

  //demo purpose only :)
  notifyMe('icon-48.png', "Posting Content..", link);

  //Add some ajax if you want :)
}

function notifyMe(icon, title, body) {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }
  // Let's check if the user is okay to get some notification
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification(
      title,
      {
        "body": body,
        "icon": icon,
      });
  }

  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function(permission) {
      // Whatever the user answers, we make sure we store the information
      if (!('permission' in Notification)) {
        Notification.permission = permission;
      }
      // If the user is okay, let's create a notification
      if (permission === "granted") {
        var notification = new Notification(
          title,
          {
            "body": body,
            "icon": icon,
          });
      }
    });
  }
}

