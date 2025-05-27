// DOM elementleri
const navbar = document.querySelector('.navbar');
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');
const dropdowns = document.querySelectorAll('.dropdown');
const captchaText = document.getElementById('captchaText');
const refreshCaptcha = document.getElementById('refreshCaptcha');
const contactForm = document.getElementById('contactForm');

// Alıntılar dizisi
const quotes = [
    {
        text: "Göçmen bir kuşsanız, Yeriniz kalpler Yurdunuz da kalplerdeki hikâyelerdir. İşte bu yüzdendir benim hikâyelere adanmışlığım..",
        author: "N.A.Ö"
    },
    {
        text: "Acılar paylaştıkça azalır, sevgiler paylaştıkça çoğalır.",
        author: "Mevlana"
    },
    {
        text: "Ama insan çoğu zaman kendini bile anlayamazken, nasıl başka bir insanı anlayabilir?",
        author: "Sabahattin Ali"
    },
    {
        text: "Sevmek, bir insanı sevmekle başlar; insan, insanı sevince, dünyayı da sevmeye başlar.",
        author: "Nazım Hikmet"
    },
    {
        text: "İnsan, aklında kalanla değil, yüreğinde kalanla yaşlanır.",
        author: "Cemal Süreya"
    },
    {
        text: "Duyguları harekete geçiren her şey düşünceye anlam katar, düşünce ise duyguları anlamlı kılar.",
        author: "Doç.Dr. Nesrin Demir"
    },
    {
        text: "Hayat, tıpkı bir kitap gibidir. Her gün yeni bir sayfa çevirir, her an yeni bir hikâye yazarsın.",
        author: "Doç.Dr. Nesrin Demir"
    },
    {
        text: "Travma geçmişte değil, bedendedir. Şifa yolculuğu, bedeni dinlemekle başlar.",
        author: "Peter Levine"
    },
    {
        text: "Sevgi, dirençlere rağmen var olma cesareti gösterebilmektir.",
        author: "Erich Fromm"
    },
    {
        text: "İçimizdeki çocuğu iyileştirmeden, dışımızdaki dünyayı iyileştiremeyiz.",
        author: "Carl Jung"
    }
];

// Rastgele alıntı gösterme fonksiyonu
function displayRandomQuote() {
    const quoteElement = document.getElementById('random-quote');
    
    if (quoteElement) {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const quote = quotes[randomIndex];
        
        const quoteTextElement = quoteElement.querySelector('.quote-text');
        const quoteAuthorElement = quoteElement.querySelector('.quote-author');
        
        if (quoteTextElement && quoteAuthorElement) {
            quoteTextElement.textContent = quote.text;
            quoteAuthorElement.textContent = quote.author;
        }
    }
}

// Improved Mobile Menu and Dropdown Functionality
const setupResponsiveNav = () => {
    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle nav
            nav.classList.toggle('active');
            
            // Toggle burger animation
            burger.classList.toggle('toggle');
            
            // Reset all dropdowns when closing the menu
            if (!nav.classList.contains('active')) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    }
    
    // Handle dropdowns better for all screen sizes
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a');
        
        // Handle mobile view differently
        const handleDropdownClick = (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
                
                // Close other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
            }
        };
        
        dropdownLink.addEventListener('click', handleDropdownClick);
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown') && window.innerWidth > 768) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // Handle window resize to reset mobile menu if needed
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && nav.classList.contains('active')) {
            nav.classList.remove('active');
            burger.classList.remove('toggle');
            
            // Reset all dropdowns
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
};

// Scroll durumunda navbar stil değişimini kontrol et
const handleScroll = () => {
    const scrollThreshold = 50; // Kaydırma eşiği (piksel)
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
};

// Sayfa yüklendiğinde çalıştır
const app = () => {
    setupResponsiveNav();
    handleScroll();
    displayRandomQuote();
};

// Uygulama başlangıcı
document.addEventListener('DOMContentLoaded', () => {
    app();
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// CAPTCHA oluşturma fonksiyonu
function generateCaptcha() {
    if (!captchaText) return;
    
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let captcha = '';
    
    for (let i = 0; i < 6; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    captchaText.textContent = captcha;
    return captcha;
}

// Sayfa yüklendiğinde CAPTCHA oluştur
if (captchaText) {
    generateCaptcha();
    
    // CAPTCHA yenileme butonu
    if (refreshCaptcha) {
        refreshCaptcha.addEventListener('click', generateCaptcha);
    }
    
    // Form gönderimi kontrolü
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const captchaInput = document.getElementById('captchaInput').value;
            
            if (captchaInput === captchaText.textContent) {
                alert('Form başarıyla gönderildi!');
                this.reset();
                generateCaptcha();
            } else {
                alert('Güvenlik kodu hatalı, lütfen tekrar deneyin.');
            }
        });
    }
} 