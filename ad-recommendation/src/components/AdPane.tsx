import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "src/hooks";
// import { adPluginCenter, plugins } from "src/plugin";
import { TAge, TGender, TUserInfo } from "src/types";

function genAd(user: TUserInfo) {
    if (user.gender === "male") {
        if (user.ageGroup === "teenager") {
            return "少年男性喜爱的广告内容";
        }
        if (user.ageGroup === "youth") {
            return "青年男性喜爱的广告内容";
        }
        if (user.ageGroup === "middleAged") {
            return "中年男性喜爱的广告内容";
        }
        if (user.ageGroup === "older") {
            return "老年男性喜爱的广告内容";
        }
    } else {
        if (user.ageGroup === "teenager") {
            return "少年女性喜爱的广告内容";
        }
        if (user.ageGroup === "youth") {
            return "青年女性喜爱的广告内容";
        }
        if (user.ageGroup === "middleAged") {
            return "中年女性喜爱的广告内容";
        }
        if (user.ageGroup === "older") {
            return "老年女性喜爱的广告内容";
        }
    }

    return "";
}

// const adContentMap: Record<`${TGender}-${TAge}`, string> = {
//     "female-middleAged": "1",
//     "female-teenager": "2",
//     "female-older": "3",
//     "female-youth": "4",
//     "male-youth": "5",
//     "male-older": "6",
//     "male-teenager": "7",
//     "male-middleAged": "8",
// };

export default function AdPane() {
    const { user } = useContext(UserContext);
    const [adContent, setAdContent] = useState("");

    useEffect(() => setAdContent(genAd(user)), [user.ageGroup, user.gender]);

    return (
        <div className="border-red padding-24px border-radius-8px bg-green text-white">
            <h3>广告位</h3>
            <article>
                {adContent}
                {/* {adContentMap[`${user.gender}-${user.ageGroup}`]} */}
            </article>
        </div>
    );
}

// export default function AdPane() {
//     const { user } = useContext(UserContext);

//     useEffect(() => {
//         adPluginCenter.load(plugins);
//     }, []);

//     return (
//         <div className="border-red padding-24px border-radius-8px bg-green text-white">
//             <h3>Advertising Space</h3>
//             {adPluginCenter.find(user).content(user) as string}
//         </div>
//     );
// }
