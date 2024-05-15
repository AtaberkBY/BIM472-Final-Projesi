function getCards(){
	const cardData = [
		{
			title: 'Darksouls III',
			image: 'style/logo/darksouls3logo.png',
			text: 'FromSoftware\'in unutulmaz aksiyon RPG serisinin üçüncü oyunu olan Dark Souls III, oyuncuları yine bir kez daha zorlu bir karanlık fantezi dünyasına götürüyor. Yenilenmiş grafikler, derinleşen hikaye ve geliştirilmiş savaş mekaniği, bu oyunu serinin hayranları için vazgeçilmez kılıyor. Cesur oyuncular, bu ölümcül dünyada hayatta kalmak ve lanetin ne olduğunu keşfetmek zorunda kalacaklar.',
			date: 'Mart, 2016'
		},
		{
			title: 'Hades II',
			image: 'style/logo/hades2-2.png',
			text: 'Supergiant Games\'in övgü dolu roguelike aksiyon oyunu Hades, oyun dünyasında bir çığır açtı. Hades, zorlu mücadeleleri, sürükleyici hikayesi ve etkileyici sanat tarzıyla oyuncuları büyülemeyi başardı. Ve şimdi, Supergiant Games merakla beklenen devamı Hades 2 ile geri dönüyor.',
			date: 'Mayıs, 2024'
		},
		{
			title: 'Helldivers 2',
			image: 'style/logo/helldivers2logo.png',
			text: 'Helldivers serisinin ikinci oyunu, galaksinin derinliklerindeki savaşa yeni bir soluk getiriyor. Oyuncular, uzak gezegenlerdeki çeşitli görevlerde yer alarak insanlığın geleceğini savunuyor. Yenilenmiş grafikler, genişletilmiş oyun mekaniği ve daha derin bir hikaye, Helldivers 2\'yi orijinal oyunun hayranlarını bile heyecanlandırmaya yetiyor\. Oyun, takım çalışmasını vurgulayan bir çok oyunculu deneyim sunarken aynı zamanda tek oyunculu modlara da odaklanıyor. Yeni silahlar, araçlar ve düşmanlarla dolu bir evrende keşfedilecek çok şey var. Helldivers 2, stratejiyi ve refleksleri bir araya getirerek oyunculara zorlu ve eğlenceli bir deneyim sunuyor. Galaksinin kaderi sizin ellerinizde, Hazır mısınız?',
			date: 'Şubat, 2024'
		},
		{
			title: 'Starfield',
			image: 'style/logo/starfieldlogo.png',
			text: 'Bethesda Game Studios\'un uzay temalı açık dünya RPG oyunu Starfield, oyuncuları galaksinin derinliklerine götürecek. Starfield, hem bilim kurgu hem de fantastik öğeleri bir araya getirerek oyunculara eşsiz bir deneyim sunmayı amaçlıyor. Oyuncular, uzay gemileriyle seyahat edip farklı gezegenleri keşfederek etkileyici hikayeyi deneyimleyecekler. Bethesda\'nın önceki oyunlarında olduğu gibi, Starfield da büyük bir açık dünya sunacak ve oyunculara keşfetmek için bolca alan sağlayacak. Bu beklenen oyun, RPG hayranları arasında büyük heyecan uyandırıyor.',
			date: 'Kasım, 2023'
		},
		{
			title: 'Elden Ring',
			image: 'style/logo/eldenringlogo.png',
			text: 'FromSoftware ve George R.R. Martin işbirliğinin ürünü olan Elden Ring, büyüleyici bir karanlık fantezi dünyasına davet ediyor. Oyuncular, epik bir maceraya atılarak fantastik yaratıklarla dolu bir dünyayı keşfedecekler. Oyun, zorlu savaşlar, karmaşık düşmanlar ve derin bir hikaye sunmayı amaçlıyor. Elden Ring, FromSoftware\'in Souls serisi hayranlarını ve George R.R. Martin\'in kitapları sevenleri cezbetmeyi hedefliyor. Heyecanla beklenen bu oyun, oyun dünyasında büyük bir etki yaratması bekleniyor.',
			date: 'Şubat, 2022'
		},
		{
			title: 'Cyberpunk 2077',
			image: 'style/logo/cyberpunk2077logo.png',
			text: 'CD Projekt Red\'in devasa açık dünya RPG oyunu Cyberpunk 2077, oyuncuları geleceğin distopik Night City şehrine götürüyor. Oyuncular, suçlularla, korporasyonlarla ve diğer tehlikelerle dolu bir dünyada hayatta kalmak için mücadele ediyorlar. Yenilikçi oyun mekaniği, etkileyici görseller ve derin hikaye anlatımı, Cyberpunk 2077\'yi oyun dünyasında büyük bir fenomen haline getirdi. Oyunun devamı olan Cyberpunk 2078, oyuncuları daha da derinleşmiş bir dünyaya götürecek ve yeni maceralar sunacak.',
			date: 'Aralık, 2020'
		},
		{
			title: 'The Elder Scrolls V',
			image: 'style/logo/elderscrolls5logo.png',
			text: 'Bethesda Game Studios\'un efsanevi RPG serisinin beşinci oyunu olan The Elder Scrolls V, Tamriel\'in epik dünyasına geri dönüyor. Oyuncular, açık dünyayı keşfedip farklı ırklarla etkileşime geçerek kendi maceralarını yaşayacaklar. Yenilenmiş grafikler, geliştirilmiş oyun mekaniği ve derinleşen hikaye, The Elder Scrolls hayranlarını heyecanlandırmaya yetiyor. Oyunun çıkışı büyük bir merakla bekleniyor.',
			date: 'Kasım, 2011'
		},
		{
			title: 'Darksouls: Remastered',
			image: 'style/logo/darksoulsremasteredlogo.png',
			text: 'FromSoftware\'in efsanevi aksiyon RPG serisinin remastered versiyonu olan Dark Souls: Remastered, oyuncuları zorlu bir karanlık fantezi dünyasına götürüyor. Oyuncular, cesur bir kahramanı kontrol ederek, lanetli topraklarda tehlikeli yaratıklarla ve zorlu patronlarla savaşacaklar. Yenilenmiş grafikler ve geliştirilmiş performans, bu ikonik oyunu yeni ve eski oyuncular için çekici kılıyor.',
			date: 'Mayıs, 2018'
		},
		{
			title: 'Darksouls II: Scholar of the First Sin',
			image: 'style/logo/darksouls2scholarlogo.png',
			text: 'FromSoftware\'in ikonik aksiyon RPG serisinin ikinci oyunu olan Dark Souls II: Scholar of the First Sin, oyuncuları karanlık ve tehlikeli bir dünyaya götürüyor. Yenilenmiş grafikler, genişletilmiş içerik ve geliştirilmiş oyun mekaniği, bu sürümü orijinal oyunu daha da iyileştiriyor. Oyuncular, cesur bir kahramanı kontrol ederek, lanetli topraklarda tehlikeli yaratıklarla ve zorlu patronlarla savaşacaklar.',
			date: 'Nisan, 2015'
		}

	];
	

const container = document.getElementById('card-container');

cardData.forEach((card) => {
	const cardElement = document.createElement('div');
	cardElement.classList.add('card', 'mb-4');

	const cardImage = document.createElement('img');
	cardImage.classList.add('card-img-top');
	cardImage.src = card.image;
	cardImage.alt = 'Post Image';

	const cardBody = document.createElement('div');
	cardBody.classList.add('card-body');

	const cardTitle = document.createElement('h2');
	cardTitle.classList.add('card-title');
	cardTitle.textContent = card.title;

	const cardText = document.createElement('p');
	cardText.classList.add('card-text');
	cardText.textContent = card.text;

	const cardDate = document.createElement('p');
	cardDate.classList.add('card-text');
	cardDate.textContent = `Published on ${card.date}`;

	cardBody.appendChild(cardTitle);
	cardBody.appendChild(cardText);
	cardBody.appendChild(cardDate);

	cardElement.appendChild(cardImage);
	cardElement.appendChild(cardBody);

	container.appendChild(cardElement);
})};

document.addEventListener('DOMContentLoaded', function(){
    getCards();
  
    
  });
