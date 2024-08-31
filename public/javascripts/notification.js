//import { userData } from "./userData.js";
import { notificationData } from "./getNotificationData.js";

(async() => {
    const notifications = await notificationData(`${window.location.origin}/userbyid`);

    const notification_count = document.getElementById("notification-count");
    const notification_container = document.getElementById("notification-container");
    const notificationButton = document.getElementById("notification-btn");

    //notification_count.hidden = true;

    const unreadNotifications = notifications.filter(notification => notification.read === "unread");
    const count = unreadNotifications.length;
  
    //window.alert(count);

    if(count > 0) {
        notification_count.hidden = false;
    } else {
        notification_count.hidden = true;
    }
    // Display the count
    notification_count.innerHTML = count;

    notifications.sort((a, b) => {
        return new Date(b.created_on) - new Date(a.created_on);
      }).map((notification, notificationIndex) => {
            //window.alert(notificationIndex);
            const notificationHolder = document.createElement('p');
            notificationHolder.dataset.target = `dataset-${notification.notification_id}`;
            const notification_message = document.createTextNode(notification.notification_message);
            const time = "  " + /\d{4}-\d{2}-\d{2}/.exec(notification.created_on);
            const notification_time = document.createElement('span');
            notification_time.innerHTML = time;
            //const Notifnumber = document.createTextNode(`${notificationIndex + 1}`);
            notificationHolder.className = "notification-message-holder";
            notification_time.className = "notification-time-span";
            notificationHolder.setAttribute('id', `id-${notification.notification_id}`);
            if (count.length < 1) {
                
                notificationHolder.innerHTML = "Nothing to show at the moment!";
            } else {
                //notification_container.appendChild(Notifnumber);
                if (notification.read === "unread") {
                    notificationHolder.style.backgroundColor = "rgba(195, 234, 252, 0.404)";
                    notificationHolder.style.border = "2px solid skyblue";
                }
                notificationHolder.appendChild(notification_message);
                notificationHolder.appendChild(notification_time);
                notification_container.appendChild(notificationHolder);
            }

            notificationHolder.addEventListener('click', async (e) => {
                e.preventDefault();
                try {
                  const res = await fetch(`${window.location.origin}/updateall/notifications/${notification.user_id}`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                      },
                  });

                } catch (error) {
                  console.log(error);
                }
              }); 
        })
})();

function readNotification(item, itemDataset) {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      //window.alert(itemDataset);
    });
  }