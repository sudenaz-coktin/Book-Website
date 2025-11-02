// Kitap bilgileri
const bookData = {
    1: {
        title: "Küçük Prens",
        description: "Antoine de Saint-Exupéry'nin ölümsüz eseri Küçük Prens, çocukluk masumiyeti ve yetişkin dünyasının karmaşıklığı arasındaki derin farkları ele alan felsefi bir masal. Küçük bir gezegenden gelen prens, Dünya'ya yaptığı yolculukta farklı karakterlerle tanışarak hayatın anlamını sorguluyor. Bu büyüleyici hikaye, dostluk, aşk ve yaşamın gerçek değerlerini keşfetmeyi öğretiyor.",
        cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
        video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    },
    2: {
        title: "1984",
        description: "George Orwell'in distopik başyapıtı 1984, totaliter bir devletin kontrolü altındaki bir toplumu anlatıyor. Winston Smith'in Büyük Birader'e karşı başkaldırısı, özgürlük, gerçek ve direniş temalarını işlerken günümüz dünyasına da ışık tutuyor. Bu etkileyici roman, teknoloji ve güç arasındaki ilişkiyi sorgulayarak okuyucuları derin düşüncelere sevk ediyor.",
        cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop",
        video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
    },
    3: {
        title: "Satranç",
        description: "Stefan Zweig'ın psikolojik derinliklerle dolu bu novellası, satranç oyununun insan ruhu üzerindeki etkisini inceleyor. Gemide geçen hikaye, geçmişte Nazi rejiminin zulmüne maruz kalmış bir adamın travmatik deneyimlerini satranç oyunu üzerinden anlatıyor. Ustalıkla işlenmiş bu eser, insan psikolojisinin karmaşıklığını gözler önüne seriyor.",
        cover: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=300&h=400&fit=crop",
        video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
    },
    4: {
        title: "Hayvan Çiftliği",
        description: "George Orwell'in alegorik başyapıtı Hayvan Çiftliği, devrim yapan çiftlik hayvanlarının hikayesini anlatırken aslında Sovyet Devrimi'ni eleştiriyor. Manor Çiftliği'nde başlayan isyan, zamanla yeni bir diktatörlüğe dönüşür. Bu güçlü alegori, güç ve yozlaşma temalarını işleyerek tüm zamanların en etkili politik eleştirilerinden biri haline gelmiştir.",
        cover: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=300&h=400&fit=crop",
        video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
    }
};

const bookItems = document.querySelectorAll('.book-item');
let hoverTimeouts = new Map();
let fullscreenTimeouts = new Map();

bookItems.forEach(item => {
    const video = item.querySelector('.book-video');
    const bookId = item.dataset.bookId;

    item.addEventListener('mouseenter', () => {
        // Varolan timeout'ları temizle
        if (hoverTimeouts.has(item)) {
            clearTimeout(hoverTimeouts.get(item));
        }
        if (fullscreenTimeouts.has(item)) {
            clearTimeout(fullscreenTimeouts.get(item));
        }

        // Video'yu başlat
        video.play();

        // 5 saniye sonra tam ekranı aç
        const fullscreenTimeout = setTimeout(() => {
            showFullscreen(bookId);
        }, 5000);
        
        fullscreenTimeouts.set(item, fullscreenTimeout);
    });

    item.addEventListener('mouseleave', () => {
        // Fullscreen timeout'ını temizle
        if (fullscreenTimeouts.has(item)) {
            clearTimeout(fullscreenTimeouts.get(item));
            fullscreenTimeouts.delete(item);
        }

        // Video'yu durdur (500ms sonra)
        const timeout = setTimeout(() => {
            video.pause();
            video.currentTime = 0;
            hoverTimeouts.delete(item);
        }, 500);

        hoverTimeouts.set(item, timeout);
    });
});

function showFullscreen(bookId) {
    const book = bookData[bookId];
    if (!book) return;

    document.getElementById('fullscreenBookCover').src = book.cover;
    
    // Her iki video elementine de src'yi set et
    document.getElementById('fullscreenBookVideoDesktop').src = book.video;
    document.getElementById('fullscreenBookVideoMobile').src = book.video;
    
    document.getElementById('fullscreenTitle').textContent = book.title;
    document.getElementById('fullscreenDescription').textContent = book.description;
    
    const overlay = document.getElementById('fullscreenOverlay');
    overlay.classList.add('show');
    
    // Body scroll'unu kapat
    document.body.style.overflow = 'hidden';
}

function addToLibrary() {
    alert('Kitap kitaplığınıza eklendi!');
}

function toggleLike() {
    const heartBtn = document.getElementById('heartBtn');
    if (heartBtn.classList.contains('liked')) {
        heartBtn.classList.remove('liked');
        heartBtn.textContent = '♡';
    } else {
        heartBtn.classList.add('liked');
        heartBtn.textContent = '♥';
    }
}

function closeFullscreen() {
    const overlay = document.getElementById('fullscreenOverlay');
    overlay.classList.remove('show');
    
    // Body scroll'unu aç
    document.body.style.overflow = 'auto';
}

// ESC tuşu ile tam ekranı kapat
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeFullscreen();
    }
});

// Overlay'e tıklayınca kapat
document.getElementById('fullscreenOverlay').addEventListener('click', function(event) {
    if (event.target === this) {
        closeFullscreen();
    }
});
const turlerBtn = document.getElementById('turlerBtn');
const dropdownContent = turlerBtn.nextElementSibling;

// Türler butonuna tıklandığında aç/kapa
turlerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
});

// Sayfaya tıklayınca dropdown'u kapatma
document.addEventListener('click', (e) => {
    if (!turlerBtn.contains(e.target) && !dropdownContent.contains(e.target)) {
        dropdownContent.style.display = 'none';
    }
});
document.getElementById('kitapligimBtn').addEventListener('click', () => {
    window.location.href = 'kitapligim.html';
});

