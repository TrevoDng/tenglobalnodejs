//import { userData } from "../../public/javascripts/userData";
import { userData } from "./adminUserData.js";
import { createUserList } from "./createUserList.js";
import { userOnclickListener } from "./userOnclickListener.js";

    const users = await userData(`${window.location.origin}/api/auth/getUsers`, "LOGIN"); //token data link
    const user = users.userData;

    const ol = document.getElementById("ol-element");
    const typeLink = document.getElementsByClassName("items-users-list");

        //create user names list
        createUserList(ol, user);
        userOnclickListener(typeLink, user);
