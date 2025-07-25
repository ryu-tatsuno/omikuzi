document.getElementById('fortuneButton').addEventListener('click', function () {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<p>占い中...</p>';
    resultDiv.className = 'result loading';

    //↓読み込み中表記されなかった...set追記
    setTimeout(() => {
        Promise.all([
            fetch('fortune.json').then(response => {
                if (!response.ok) throw new Error('データの取得に失敗しました1');
                return response.json();
            }),
            fetch('item.json').then(response => {
                if (!response.ok) throw new Error('データの取得に失敗しました2');
                return response.json();
            }),
            fetch('daikiti.json').then(response => {
                if (!response.ok) throw new Error('データの取得に失敗しました3');
                return response.json();
            }),
            fetch('tyukiti.json').then(response => {
                if (!response.ok) throw new Error('データの取得に失敗しました4');
                return response.json();
            }),
            fetch('syokiti.json').then(response => {
                if (!response.ok) throw new Error('データの取得に失敗しました5');
                return response.json();
            }),
            fetch('kyo.json').then(response => {
                if (!response.ok) throw new Error('データの取得に失敗しました6');
                return response.json();
            })
        ])
    .then(([fortuneData, itemData, daikitiData, tyukitiData, syokitiData, kyoData]) => {
        const resultDiv = document.getElementById('result');

        const randomfortune = Math.floor(Math.random() * fortuneData.length);
        const fortune = fortuneData[randomfortune];

        const randomitem = Math.floor(Math.random() * itemData.length);
        const item = itemData[randomitem];

        let message = "";

        if (fortune.fortune == "大吉") {
            //大吉.jsonの行を指定し持ってくる
            const randomMessageIndex = Math.floor(Math.random() * 15);
            const randomLoveIndex = Math.floor(Math.random() * 15)+15;
            const randomWishIndex = Math.floor(Math.random() * 15)+30;
            const randomTravelIndex = Math.floor(Math.random() * 15)+45;
            const randomIllnessIndex = Math.floor(Math.random() * 15)+60;

            message = `<p>${daikitiData[randomMessageIndex].message}</p>`;
            love_message = `<p>${daikitiData[randomLoveIndex].love_message}</p>`;
            wish_message = `<p>${daikitiData[randomWishIndex].wish_message}</p>`;
            travel_message = `<p>${daikitiData[randomTravelIndex].travel_message}</p>`;
            illness_message = `<p>${daikitiData[randomIllnessIndex].illness_message}</p>`;

        } else if (fortune.fortune == "中吉") {
            const randomMessageIndex = Math.floor(Math.random() * 15);
            const randomLoveIndex = Math.floor(Math.random() * 15)+15;
            const randomWishIndex = Math.floor(Math.random() * 15)+30;
            const randomTravelIndex = Math.floor(Math.random() * 15)+45;
            const randomIllnessIndex = Math.floor(Math.random() * 15)+60;

            message = `<p>${tyukitiData[randomMessageIndex].message}</p>`;
            love_message = `<p>${tyukitiData[randomLoveIndex].love_message}</p>`;
            wish_message = `<p>${tyukitiData[randomWishIndex].wish_message}</p>`;
            travel_message = `<p>${tyukitiData[randomTravelIndex].travel_message}</p>`;
            illness_message = `<p>${tyukitiData[randomIllnessIndex].illness_message}</p>`;
        } else if (fortune.fortune == "小吉") {
            const randomMessageIndex = Math.floor(Math.random() * 15);
            const randomLoveIndex = Math.floor(Math.random() * 15)+15;
            const randomWishIndex = Math.floor(Math.random() * 15)+30;
            const randomTravelIndex = Math.floor(Math.random() * 15)+45;
            const randomIllnessIndex = Math.floor(Math.random() * 15)+60;

            message = `<p>${syokitiData[randomMessageIndex].message}</p>`;
            love_message = `<p>${syokitiData[randomLoveIndex].love_message}</p>`;
            wish_message = `<p>${syokitiData[randomWishIndex].wish_message}</p>`;
            travel_message = `<p>${syokitiData[randomTravelIndex].travel_message}</p>`;
            illness_message = `<p>${syokitiData[randomIllnessIndex].illness_message}</p>`;
        } else if (fortune.fortune == "凶") {
            const randomMessageIndex = Math.floor(Math.random() * 15);
            const randomLoveIndex = Math.floor(Math.random() * 15)+15;
            const randomWishIndex = Math.floor(Math.random() * 15)+30;
            const randomTravelIndex = Math.floor(Math.random() * 15)+45;
            const randomIllnessIndex = Math.floor(Math.random() * 15)+60;

            message = `<p>${kyoData[randomMessageIndex].message}</p>`;
            love_message = `<p>${kyoData[randomLoveIndex].love_message}</p>`;
            wish_message = `<p>${kyoData[randomWishIndex].wish_message}</p>`;
            travel_message = `<p>${kyoData[randomTravelIndex].travel_message}</p>`;
            illness_message = `<p>${kyoData[randomIllnessIndex].illness_message}</p>`;
        }

        resultDiv.className = 'result';

        // 結果表示（message が空なら表示しない）
        resultDiv.innerHTML = `<h2>${fortune.fortune}</h2>${message}
            <div class="message-block"><h3>恋愛</h3>${love_message}</div>
            <div class="message-block"><h3>願い事</h3>${wish_message}</div>
            <div class="message-block"><h3>旅行</h3>${travel_message}</div>
            <div class="message-block"><h3>病気</h3>${illness_message}</div>
            <div class="message-block"><h3>ラッキーアイテム</h3><p>${item.item}</p></div>
        `;


        // 運勢ごとの色分け
        resultDiv.classList.add(fortune.type);
        })
        .catch(error => {
            document.getElementById('result').innerText = error.message;
        });
    }, 2000);
});
