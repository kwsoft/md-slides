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
        // Implement your slide creation logic here
        // 1. Extract headings and content
        // 2. Create slide elements
        // 3. Set slide background images
        // 4. Append slides to the presentation element
    }
});
