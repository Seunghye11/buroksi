document.addEventListener('DOMContentLoaded', function () {
    const rightColumn = document.querySelector('.right_colum');
    const leftColumn = document.querySelector('.left_colum');
    const leftSection1 = document.getElementById('left_section1');
    const leftSection2 = document.getElementById('left_section2');
    const leftSection3 = document.getElementById('left_section3');
    const rightSection1 = document.getElementById('right_section1');
    const rightSection2 = document.getElementById('right_section2');
    const rightSection3 = document.getElementById('right_section3');
    const rightSection4 = document.getElementById('right_section4');
    const rightSection5 = document.getElementById('right_section5');
    const rightSection6 = document.getElementById('right_section6');
    const rightSection7 = document.getElementById('right_section7');

    let isScrolling = false;

    // IntersectionObserver 설정 for rightColumn
    const rightObserverOptions = {
        root: rightColumn,
        threshold: 0.5,
        rootMargin: '0px 0px -10% 0px'
    };

    const rightObserverCallback = (entries) => {
        if (isScrolling) return;

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                isScrolling = true;

                if (entry.target === rightSection1) {
                    leftColumn.scrollTo({ top: leftSection1.offsetTop, behavior: 'smooth' });
                } else if ([rightSection2, rightSection3, rightSection4, rightSection5, rightSection6].includes(entry.target)) {
                    leftColumn.scrollTo({ top: leftSection2.offsetTop, behavior: 'smooth' });
                } else if (entry.target === rightSection7) {
                    leftColumn.scrollTo({ top: leftSection3.offsetTop, behavior: 'smooth' });
                }

                setTimeout(() => { isScrolling = false; }, 500);
            }
        });
    };

    const rightObserver = new IntersectionObserver(rightObserverCallback, rightObserverOptions);
    [rightSection1, rightSection2, rightSection3, rightSection4, rightSection5, rightSection6, rightSection7].forEach(section => {
        rightObserver.observe(section);
    });

    // IntersectionObserver 설정 for leftColumn
    const leftObserverOptions = {
        root: leftColumn,
        threshold: 0.5,
        rootMargin: '0px 0px -10% 0px'
    };

    const leftObserverCallback = (entries) => {
        if (isScrolling) return;

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                isScrolling = true;

                if (entry.target === leftSection1) {
                    rightColumn.scrollTo({ top: rightSection1.offsetTop, behavior: 'smooth' });
                } else if (entry.target === leftSection2) {
                    rightColumn.scrollTo({ top: rightSection2.offsetTop, behavior: 'smooth' });
                } else if (entry.target === leftSection3) {
                    rightColumn.scrollTo({ top: rightSection7.offsetTop, behavior: 'smooth' });
                }

                setTimeout(() => { isScrolling = false; }, 500);
            }
        });
    };

    const leftObserver = new IntersectionObserver(leftObserverCallback, leftObserverOptions);
    [leftSection1, leftSection2, leftSection3].forEach(section => {
        leftObserver.observe(section);
    });

    // Smooth scrolling on arrow_btn click
    document.querySelectorAll('.arrow_btn').forEach(btn => {
        btn.addEventListener('click', function (event) {
            event.preventDefault();
            isScrolling = true;

            rightColumn.scrollTo({
                top: rightSection1.offsetTop,
                behavior: 'smooth'
            });

            leftColumn.scrollTo({
                top: leftSection1.offsetTop,
                behavior: 'smooth'
            });

            setTimeout(() => { isScrolling = false; }, 1000);
        });
    });

    // Hover effect for .highlight elements
    const highlights = document.querySelectorAll('.highlight');
    highlights.forEach((highlight, index) => {
        const btmImg = document.querySelector(`.btm_img${index + 1}`);

        highlight.addEventListener('mouseover', () => {
            btmImg.style.display = 'block';
        });

        highlight.addEventListener('mouseout', () => {
            btmImg.style.display = 'none';
        });
    });

    document.addEventListener("mousemove", function(e) {
        const images = document.querySelectorAll('.main_img2, .grid_eye1, .grid_eye2');
    
        images.forEach(img => {
            const rect = img.getBoundingClientRect();
            const mouseX = e.clientX - rect.left - rect.width / 1;
            const mouseY = e.clientY - rect.top - rect.height / 0.5;
    
            let maxMove = img.classList.contains('main_img2') ? 15 : 2;
    
            const moveX = (mouseX / rect.width) * maxMove;
            const moveY = (mouseY / rect.height) * maxMove;
    
            img.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
});