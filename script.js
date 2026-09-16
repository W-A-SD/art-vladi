// Плавная прокрутка к секциям
function scrollToContact() {
    document.querySelector('#contact').scrollIntoView({
        behavior: 'smooth'
    });
}

function scrollToCourses() {
    document.querySelector('#courses').scrollIntoView({
        behavior: 'smooth'
    });
}

// Мобильное меню
function toggleMenu() {
    const menu = document.querySelector('.nav-menu');
    menu.classList.toggle('active');
    
    // Анимация бургера
    const burgerSpans = document.querySelectorAll('.burger span');
    burgerSpans.forEach((span, index) => {
        if (menu.classList.contains('active')) {
            if (index === 0) {
                span.style.transform = 'rotate(45deg) translate(5px, 5px)';
            } else if (index === 1) {
                span.style.opacity = '0';
            } else {
                span.style.transform = 'rotate(-45deg) translate(5px, -5px)';
            }
        } else {
            span.style.transform = 'none';
            span.style.opacity = '1';
        }
    });
}

// Закрытие мобильного меню при клике на ссылку
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const menu = document.querySelector('.nav-menu');
            if (menu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    // Обработка формы
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
    
    // Анимация при скролле
    window.addEventListener('scroll', revealOnScroll);
    
    // Инициализация анимаций
    revealOnScroll();
});

// Обработка отправки формы
function handleSubmit(event) {
    event.preventDefault();
    
    // Здесь будет логика отправки формы на сервер
    // Для демонстрации показываем уведомление
    
    const form = event.target;
    const formData = new FormData(form);
    const name = formData.get('name') || 'Дорогой гость';
    
    // Создаем уведомление
    showNotification(`Спасибо, ${name}! Мы свяжемся с вами в ближайшее время.`);
    
    // Очищаем форму
    form.reset();
    
    return false;
}

// Функция показа уведомления
function showNotification(message) {
    // Удаляем старые уведомления
    const oldNotification = document.querySelector('.notification');
    if (oldNotification) {
        oldNotification.remove();
    }
    
    // Создаем новое уведомление
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: var(--gold);
        color: var(--black);
        padding: 20px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.5s ease-out;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        max-width: 350px;
    `;
    
    document.body.appendChild(notification);
    
    // Добавляем стили для анимации
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Удаляем уведомление через 5 секунд
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-in';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}

// Анимация элементов при скролле
function revealOnScroll() {
    const elements = document.querySelectorAll('.course-card, .advantage-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100 && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Инициализация стилей для анимации скролла
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.course-card, .advantage-item');
    elements.forEach(element => {
        element.style.transition = 'all 0.6s ease-out';
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
    });
    
    // Запускаем проверку видимости
    revealOnScroll();
});

// Плавная прокрутка для всех якорных ссылок
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});


// Функции для модального окна
function openModal(courseNumber) {
    const modal = document.getElementById('courseModal');
    const modalTitle = document.querySelector('.modal-title');
    const modalBody = document.querySelector('.modal-body');
    
    // Данные для каждого курса
    const coursesData = {
        1: {
            title: 'Базовый курс маникюра',
            content: `
                <div class="modal-section">
                    <h3 class="modal-section-title">ОРГАНИЗАЦИЯ</h3>
                    <p><strong>Длительность:</strong> 7 дней.</p>
                    <p><strong>Форматы:</strong> будни (ПН–ПТ, 9:00–16:00, обед 12–13) или выходные (СБ–ВС, 10:00–16:00, обед 13–13:30, доп. плата).</p>
                    <p><strong>Группы:</strong> до 6–8 чел. или индивидуально (цена отдельно).</p>
                </div>
                <div class="modal-section">
                    <h3 class="modal-section-title">ОПЛАТА</h3>
                    <p><strong>25 000 ₽</strong> (материалы включены).</p>
                    <p>50% при бронировании, 50% в первый день. Рассрочка через банки-партнёры (Т-Банк, СберБанк,Альфа-Банк).</p>
                </div>
                <div class="modal-section">
                    <h3 class="modal-section-title">ЧТО ВХОДИТ</h3>
                    <p>Все расходники и материалы предоставляются на время обучения. После обучения можно приобрести материалы в центре.</p>
                </div>
                <div class="modal-section">
                    <h3 class="modal-section-title">ДОКУМЕНТЫ</h3>
                    <p>Сертификат с занесением в ФИС ФРДО, действует по всей РФ.</p>
                </div>
                <div class="modal-section">
                    <h3 class="modal-section-title">ДЛЯ ЗАЧИСЛЕНИЯ</h3>
                    <p>Паспорт (копия), СНИЛС, договор (подписывается в центре).</p>
                </div>
            `
        },
        2: {
            title: 'Моделирование и укрепление ногтей',
            content: `
                <div class="modal-section">
                    <h3 class="modal-section-title">ОРГАНИЗАЦИЯ</h3>
                    <p><strong>Длительность:</strong> 7 дней.</p>
                    <p><strong>Форматы:</strong> будни (ПН–ПТ, 9:00–16:00, обед 12–13) или выходные (СБ–ВС, 10:00–16:00, обед 13–13:30, доп. плата).</p>
                    <p><strong>Группы:</strong> до 6–8 чел. или индивидуально (цена отдельно).</p>
                </div>
                <div class="modal-section">
                    <h3 class="modal-section-title">ОПЛАТА</h3>
                    <p><strong>35 000 ₽</strong> (материалы включены).</p>
                    <p>50% при брони, 50% в первый день. Рассрочка через банки-партнёры (Т-Банк, СберБанк,Альфа-Банк).</p>
                </div>
                <div class="modal-section">
                    <h3 class="modal-section-title">ЧТО ВХОДИТ</h3>
                    <p>Все расходники и материалы предоставляются на время обучения. После обучения можно приобрести материалы в центре.</p>
                </div>
                <div class="modal-section">
                    <h3 class="modal-section-title">ДОКУМЕНТЫ</h3>
                    <p>Сертификат в ФИС ФРДО, действует по РФ.</p>
                </div>
                <div class="modal-section">
                    <h3 class="modal-section-title">ДЛЯ ЗАЧИСЛЕНИЯ</h3>
                    <p>Паспорт (копия), СНИЛС, договор.</p>
                </div>
            `
        },
        3: {
            title: 'Совмещенный курс',
            content: `
                <div class="modal-section">
                    <h3 class="modal-section-title">ОРГАНИЗАЦИЯ</h3>
                    <p><strong>Длительность:</strong> 14 дней.</p>
                    <p><strong>Форматы:</strong> будни (ПН–ПТ, 9:00–16:00, обед 12–13) или выходные (СБ–ВС, 10:00–16:00, обед 13–13:30, доп. плата).</p>
                    <p><strong>Группы:</strong> до 6–8 чел. или индивидуально (цена отдельно).</p>
                </div>
                <div class="modal-section">
                    <h3 class="modal-section-title">ОПЛАТА</h3>
                    <p><strong>55 000 ₽</strong> (материалы включены).</p>
                    <p>50% при брони, 50% в первый день. Рассрочка через банки-партнёры (Т-Банк, СберБанк,Альфа-Банк).</p>
                </div>
                <div class="modal-section">
                    <h3 class="modal-section-title">ЧТО ВХОДИТ</h3>
                    <p>Все расходники и материалы предоставляются на время обучения. После обучения можно приобрести материалы в центре.</p>
                </div>
                <div class="modal-section">
                    <h3 class="modal-section-title">ДОКУМЕНТЫ</h3>
                    <p>Сертификат в ФИС ФРДО, действует по РФ.</p>
                </div>
                <div class="modal-section">
                    <h3 class="modal-section-title">ДЛЯ ЗАЧИСЛЕНИЯ</h3>
                    <p>Паспорт (копия), СНИЛС, договор.</p>
                </div>
            `
        },
        4: {
            title: 'Подготовка к чемпионату',
            content: `
                <div class="modal-section">
                    <h3 class="modal-section-title">ОРГАНИЗАЦИЯ</h3>
                    <p><strong>Длительность:</strong> 3-5 дней.</p>
                    <p><strong>Форматы:</strong> Офлайн (в студии по адресу), Онлайн (закрытый клуб + видео-разборы ваших работ + прямые эфиры с обратной связью) или Гибрид.</p>
                </div>
                <div class="modal-section">
                    <h3 class="modal-section-title">ДЛЯ КОГО</h3>
                    <p>Для начинающих — кто впервые выходит на чемпионат и хочет сделать это грамотно, без ошибок новичка.</p>
                    <p>Для опытных мастеров — кто уже участвовал, но не добивался призовых мест или хочет перейти в сложные номинации (объём, дизайн, микроживопись).</p>
                    <p>Уровень определяется на собеседовании.</p>
                </div>
                <div class="modal-section">
                    <h3 class="modal-section-title">ОПЛАТА</h3>
                    <p><strong>25 000 ₽</strong> (материалы включены).</p>
                    <p>50% при брони, 50% в первый день. Рассрочка через банки-партнёры (Т-Банк, СберБанк,Альфа-Банк).</p>
                </div>
                <div class="modal-section">
                    <h3 class="modal-section-title">ЧТО ВХОДИТ</h3>
                    <p>Все расходники и материалы предоставляются на время обучения. После обучения можно приобрести материалы в центре.</p>
                </div>
                <div class="modal-section">
                    <h3 class="modal-section-title">ДОКУМЕНТЫ</h3>
                    <p>Сертификат в ФИС ФРДО, действует по РФ.</p>
                </div>
                <div class="modal-section">
                    <h3 class="modal-section-title">ДЛЯ ЗАЧИСЛЕНИЯ</h3>
                    <p>Паспорт (копия), СНИЛС, договор.</p>
                </div>
            `
        },
        5: {
            title: 'Повышение квалификации',
            content: `
                <div class="modal-section">
                    <h3 class="modal-section-title">О КУРСЕ</h3>
                    <p><strong>Длительность:</strong> 16 академических часов.</p>
                    <p><strong>Формат:</strong> Офлайн (в студии по адресу) или Онлайн.</p>
                </div>
                <div class="modal-section">
                    <h3 class="modal-section-title">ДЛЯ КОГО</h3>
                    <p>Для практикующих мастеров со стажем от 2 лет, желающих систематизировать знания, освоить новые техники и получить официальное подтверждение уровня.</p>
                </div>
                <div class="modal-section">
                    <h3 class="modal-section-title">ОПЛАТА</h3>
                    <p><strong>65 000 ₽</strong> (материалы включены).</p>
                    <p>50% при брони, 50% в первый день. Рассрочка через банки-партнёры (Т-Банк, СберБанк,Альфа-Банк).</p>
                </div>
                <div class="modal-section">
                    <h3 class="modal-section-title">ЧТО ВХОДИТ</h3>
                    <p>Все расходники и материалы предоставляются на время обучения. После обучения можно приобрести материалы в центре.</p>
                </div>
                <div class="modal-section">
                    <h3 class="modal-section-title">ДОКУМЕНТЫ</h3>
                    <p>Сертификат в ФИС ФРДО, действует по РФ.</p>
                </div>
                <div class="modal-section">
                    <h3 class="modal-section-title">ДЛЯ ЗАЧИСЛЕНИЯ</h3>
                    <p>Паспорт (копия), СНИЛС, договор.</p>
                </div>
            `
        }
    };
    
    // Заполняем модальное окно данными выбранного курса
    const courseData = coursesData[courseNumber] || coursesData[1];
    modalTitle.innerHTML = `<span class="gold">${courseData.title}</span>`;
    modalBody.innerHTML = courseData.content + `<button class="modal-btn" onclick="closeModal()">Закрыть</button>`;
    
    // Показываем модальное окно
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('courseModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Возвращаем прокрутку
}

// Закрытие модального окна при клике на фон
document.addEventListener('click', function(event) {
    const modal = document.getElementById('courseModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Закрытие модального окна при нажатии Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});


// Открытие изображения в полном размере
function openImage(src) {
    // Создаем оверлей
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
        cursor: pointer;
        animation: fadeIn 0.3s ease-out;
    `;
    
    // Закрытие по клику на фон
    overlay.onclick = function() {
        overlay.remove();
        document.body.style.overflow = 'auto';
    };
    
    // Создаем изображение
    const img = document.createElement('img');
    img.src = src;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border: 2px solid var(--gold);
        border-radius: 5px;
    `;
    
    overlay.appendChild(img);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
}

// Закрытие по Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const overlay = document.querySelector('div[style*="z-index: 10001"]');
        if (overlay) {
            overlay.remove();
            document.body.style.overflow = 'auto';
        }
    }
});