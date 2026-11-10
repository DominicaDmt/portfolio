document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // 0. ПЕРЕКЛЮЧАТЕЛЬ ТЕМ (всегда старт с тёмной)
    // ============================================
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light');
        });

        themeToggle.addEventListener('mouseenter', () => {
            const cursor = document.querySelector('.cursor');
            if (cursor) cursor.classList.add('hover');
        });
        themeToggle.addEventListener('mouseleave', () => {
            const cursor = document.querySelector('.cursor');
            if (cursor) cursor.classList.remove('hover');
        });
    }

    // ============================================
    // 1. КАСТОМНЫЙ КУРСОР (КРЕСТИК)
    // ============================================
    const cursor = document.querySelector('.cursor');
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .faq-question, .skills-list li, .exp-item');

    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    // ============================================
    // 2. АНИМАЦИЯ ПОЯВЛЕНИЯ СЕКЦИЙ ПРИ СКРОЛЛЕ
    // ============================================
    const sections = document.querySelectorAll('section:not(.hero)');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // ============================================
    // 3. ПАРАЛЛАКС В HERO
    // ============================================
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY < window.innerHeight) {
                heroImage.style.transform = `translateY(${scrollY * 0.3}px) scale(1.1)`;
            }
        });
    }

    // ============================================
    // 4. МАГНИТНАЯ КНОПКА
    // ============================================
    const magneticBtn = document.querySelector('.scroll-btn');
    if (magneticBtn) {
        magneticBtn.addEventListener('mousemove', (e) => {
            const rect = magneticBtn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            magneticBtn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        magneticBtn.addEventListener('mouseleave', () => {
            magneticBtn.style.transform = 'translate(0, 0)';
        });
    }

    // ============================================
    // 5. ДАННЫЕ ПРОЕКТОВ
    // ============================================
    const projectsData = {
        gallery: {
            title: "Online Gallery",
            description: "Полноценная платформа для художников, разработанная с нуля. Проект включает в себя регистрацию пользователей (художников и покупателей), личный кабинет для загрузки и управления работами, админ-панель, а также полноценную корзину и оплату.",
            details: [
                "<strong>Роль:</strong> Full-Stack разработчик, дизайнер",
                "<strong>Стек:</strong> Python, Django, JavaScript, ЮKassa API",
                "<strong>Функционал:</strong> Аутентификация, загрузка изображений, фильтрация работ, интеграция платежной системы, управление каталогом и пользователями.",
                "<strong>Результат:</strong> Рабочий прототип, готовый к продакшену. Сайт полностью адаптирован под мобильные устройства."
            ],
            images: ["img/arte1.png", "img/arte2.png", "img/arte3.png"]
        },
        brandbook: {
            title: "Brandbook for College",
            description: "Разработка официального брендбука для Колледжа Судостроения и Прикладных Технологий. Проект включал в себя создание актуального фирменного стиля, который отражает современный подход учебного заведения и привлекает абитуриентов.",
            details: [
                "<strong>Роль:</strong> Графический дизайнер, бренд-дизайнер",
                "<strong>Инструменты:</strong> Figma, Adobe Illustrator",
                "<strong>Состав брендбука:</strong> Логотип и его вариации, цветовая палитра, типографика, правила использования на носителях, мокапы, макет сайта.",
                "<strong>Результат:</strong> Единая визуальная система, которая сделала бренд колледжа более узнаваемым и современным."
            ],
            images: ["img/logo_ksipt.png", "img/business_card.png", "img/palette.png", "img/ksipt_layout.png"]
        },
        smm: {
            title: "Design & 3D Works",
            description: "Коллекция моих творческих и учебных работ, демонстрирующих навыки в графическом дизайне, создании карточек товаров и 3D-моделировании. Здесь я экспериментирую с визуалом, цветом и анимацией.",
            details: [
                "<strong>Роль:</strong> Графический дизайнер, 3D-художник",
                "<strong>Инструменты:</strong> Figma, Adobe Photoshop, Blender",
                "<strong>Проекты:</strong> Дизайн промо-карточки для часов Rolex; серия карточек товаров для маркетплейса; 3D-анимация для карты Сбербанка; Стилизованная 3D-комната в технике claymorphism (soft 3D).",
                "<strong>Результат:</strong> Навык работы с разными стилями: от реалистичного премиум-дизайна до стилизованной 3D-анимации."
            ],
            videoUrl: "img/sber.mp4",
            images: ["img/rolex.png", "img/room.jpg", "img/cards.png"]
        }
    };

    const drawer = document.getElementById('projectDrawer');
    const drawerContent = document.getElementById('drawerContent');
    const closeDrawerBtn = document.getElementById('closeDrawer');

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const projectKey = card.getAttribute('data-project');
            const data = projectsData[projectKey];

            if (data) {
                let html = `<h2>${data.title}</h2>`;
                html += `<p>${data.description}</p>`;
                html += `<ul>`;
                data.details.forEach(detail => {
                    html += `<li>${detail}</li>`;
                });
                html += `</ul>`;

                if (data.images && data.images.length > 0) {
                    html += `<div class="drawer-gallery">`;
                    data.images.forEach(imgSrc => {
                        html += `<img src="${imgSrc}" alt="Project Image">`;
                    });
                    html += `</div>`;
                }

                if (data.videoUrl) {
                    const isLocalVideo = /\.(mp4|webm|ogg)$/i.test(data.videoUrl);
                    if (isLocalVideo) {
                        html += `
                            <div class="drawer-video">
                                <video controls playsinline id="projectVideo">
                                    <source src="${data.videoUrl}" type="video/mp4">
                                    Ваш браузер не поддерживает видео.
                                </video>
                                <p id="videoError" style="display:none; color: #e60000; text-align: center; padding: 1rem; font-size: 0.9rem;">
                                    ⚠️ Видео не найдено. Проверь путь: ${data.videoUrl}
                                </p>
                            </div>
                        `;
                    } else {
                        html += `
                            <div class="drawer-video">
                                <iframe src="${data.videoUrl}" frameborder="0" allowfullscreen></iframe>
                            </div>
                        `;
                    }
                }

                drawerContent.innerHTML = html;
                drawer.classList.add('active');
                document.body.style.overflow = 'hidden';
                drawerContent.scrollTop = 0;

                drawerContent.querySelectorAll('a, button').forEach(el => {
                    el.addEventListener('mouseenter', () => cursor && cursor.classList.add('hover'));
                    el.addEventListener('mouseleave', () => cursor && cursor.classList.remove('hover'));
                });

                const videoEl = document.getElementById('projectVideo');
                if (videoEl) {
                    videoEl.addEventListener('error', () => {
                        videoEl.style.display = 'none';
                        const errEl = document.getElementById('videoError');
                        if (errEl) errEl.style.display = 'block';
                    });
                }
            }
        });
    });

    closeDrawerBtn.addEventListener('click', () => {
        drawer.classList.remove('active');
        document.body.style.overflow = '';
    });

    drawer.addEventListener('click', (e) => {
        if (e.target === drawer) {
            drawer.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ============================================
    // 6. АККОРДЕОН FAQ
    // ============================================
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });
            item.classList.toggle('active');
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

});