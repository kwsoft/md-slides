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
    
            if (heading.tagName === "H1") {
                slide.classList.add("presentation-title");
                slide.innerHTML = `<h1>${heading.textContent}</h1>`;
            } else if (heading.tagName === "H2") {
                slide.classList.add("section-title");
                slide.innerHTML = `<h2>${heading.textContent}</h2>`;
                // Set a random urban architecture image as the background
                slide.style.backgroundImage = `url(https://source.unsplash.com/random/featured/?urban,architecture)`;
            } else if (heading.tagName === "H3") {
                slide.classList.add("page");
                slide.innerHTML = `<h3>${heading.textContent}</h3>`;
                let sibling = heading.nextElementSibling;
                while (sibling && !sibling.matches("h1, h2, h3")) {
                    slide.appendChild(sibling.cloneNode(true));
                    sibling = sibling.nextElementSibling;
                }
            }
    
            slides.push(slide);
            presentation.appendChild(slide);
        });
    
        return slides;
    }
});
