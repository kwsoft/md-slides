document.addEventListener("DOMContentLoaded", async () => {
    const presentation = document.getElementById("presentation");
    const mdContent = await axios.get("content.md");
    const htmlContent = marked(mdContent.data);

    const parser = new DOMParser();
    const parsedHTML = parser.parseFromString(htmlContent, "text/html");

    const slides = createSlides(parsedHTML);

    let currentSlide = 0;
    slides[currentSlide].classList.add("active");

    presentation.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "ArrowLeft":
                if (currentSlide > 0) {
                    slides[currentSlide].classList.remove("active");
                    currentSlide--;
                    slides[currentSlide].classList.add("active");
                }
                break;
            case "ArrowRight":
                if (currentSlide < slides.length - 1) {
                    slides[currentSlide].classList.remove("active");
                    currentSlide++;
                    slides[currentSlide].classList.add("active");
                }
                break;
            case "Escape":
                // Perform any necessary clean up when exiting
                break;
        }
    });

    function createSlides(parsedHTML) {
        const slides = [];
        const headings = parsedHTML.querySelectorAll("h1, h2, h3");
    
        headings.forEach((heading) => {
            const slide = document.createElement("div");
            slide.classList.add("slide");
    
            const slideContent = document.createElement("div");
            slideContent.classList.add("slide-content");
    
            if (heading.tagName === "H1") {
                slide.classList.add("presentation-title");
                slideContent.innerHTML = `<h1>${heading.textContent}</h1>`;
            } else if (heading.tagName === "H2") {
                slide.classList.add("section-title");
                slideContent.innerHTML = `<h2>${heading.textContent}</h2>`;
                // Set a random urban architecture image as the background
                slide.style.backgroundImage = `url(https://source.unsplash.com/random/featured/?urban,architecture)`;
            } else if (heading.tagName === "H3") {
                slide.classList.add("page");
                slideContent.innerHTML = `<h3>${heading.textContent}</h3>`;
                let sibling = heading.nextElementSibling;
                while (sibling && !sibling.matches("h1, h2, h3")) {
                    slideContent.appendChild(sibling.cloneNode(true));
                    sibling = sibling.nextElementSibling;
                }
            }
    
            slide.appendChild(slideContent);
            slides.push(slide);
            presentation.appendChild(slide);
        });
    
        return slides;
    }
});
