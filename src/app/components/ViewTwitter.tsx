// クライアントコンポーネント
"use client" // ←※※注意ポイント①※※

import React, { useState } from 'react';

// const TwitterList = (lists: any) => {
//     console.log(lists)
//     return (
//         <>
//             {lists.map((list: string, index) => {
//                 <div className="float_l" key={index}>
//                     <a className="twitter-timeline float_l" data-width="600" data-height="600" href={"https://twitter.com/" + list + "?ref_src=twsrc%5Etfw"}>
//                         Tweets by FortniteJP
//                     </a>
//                     <script async src="https://platform.twitter.com/widgets.js"></script>
//                 </div>
//             })}
//         </>
//     );
// }

const ViewTwitter = () => {
    const [viewTwitter, setViewTwitter] = useState(false);
    const handleChangeTwitter = () => {
        setViewTwitter(!viewTwitter);
    }

    return (
        <div className="todo-wrapper">
            <h2>News(いずれは設定ページで表示内容可変)</h2>
            <button onClick={() => handleChangeTwitter()}>change</button>
            {!viewTwitter &&
                <div>
                    {/* <TwitterList lists={urls} /> */}
                    <div className="float_l">
                        <a className="twitter-timeline float_l" data-width="600" data-height="600" href="https://twitter.com/FortniteJP?ref_src=twsrc%5Etfw">
                            Tweets by FortniteJP
                        </a>
                        <script async src="https://platform.twitter.com/widgets.js"></script>
                    </div>

                    <div className="float_l">
                        <a className="twitter-timeline float_l" data-width="600" data-height="600" href={'https://twitter.com/Nintendo?ref_src=twsrc%5Etfw'}>
                            Tweets by Nintendo
                        </a>
                        <script async src="https://platform.twitter.com/widgets.js"></script>
                    </div>
                </div>
            }
        </div >
    );
};

export default ViewTwitter;