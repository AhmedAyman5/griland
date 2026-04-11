const machineryCardsData = [
    {
        image: "./images/card1.jpg",
        alt: "Potato Harvesters",
        titleI18n: "mach_c1_title",
        title: "Potato Harvesters",
        descI18n: "mach_c1_desc",
        desc: "Self-propelled and trailed potato harvesters for efficient, high-capacity potato harvesting. Models include AVR Puma 4.0 (4-row, self-propelled) and Spirit series (1–2 row, trailed).",
        delayClass: ""
    },
    {
        image: "./images/card2.png",
        alt: "Potato Planters",
        titleI18n: "mach_c2_title",
        title: "Potato Planters",
        descI18n: "mach_c2_desc",
        desc: "Precision potato planting machines for accurate seed spacing and planting depth control. Ideal for large-scale potato cultivation.",
        delayClass: "delay-100"
    },
    {
        image: "./images/card3.jpg",
        alt: "Soil Preparation Machines",
        titleI18n: "mach_c3_title",
        title: "Soil Preparation Machines",
        descI18n: "mach_c3_desc",
        desc: "Full range of soil preparation equipment including ploughs, disc harrows, rotary tillers, and bed formers for optimal seedbed preparation.",
        delayClass: "delay-200"
    },
    {
        image: "./images/card4.png",
        alt: "Haulm Toppers",
        titleI18n: "mach_c4_title",
        title: "Haulm Toppers",
        descI18n: "mach_c4_desc",
        desc: "Professional haulm topping machines for destroying potato foliage before harvest. Ensures clean, efficient crop preparation.",
        delayClass: ""
    },
    {
        image: "./images/card5.jpg",
        alt: "Storage & Handling Machines",
        titleI18n: "mach_c5_title",
        title: "Storage & Handling Machines",
        descI18n: "mach_c5_desc",
        desc: "Potato and vegetable intake and storage line machines — including box fillers, conveyor systems, and grading equipment.",
        delayClass: "delay-100"
    },
    {
        image: "./images/card6.png",
        alt: "Tractors",
        titleI18n: "mach_c6_title",
        title: "Tractors",
        descI18n: "mach_c6_desc",
        desc: "A wide range of agricultural tractors from compact models to heavy-duty high-horsepower machines. Suitable for all farm sizes and soil types.",
        delayClass: "delay-200",
        imageFit: "object-contain",
        wrapperEx: " bg-white flex justify-center items-center"
    },
    {
        image: "./images/card7.webp",
        alt: "Combine Harvesters",
        titleI18n: "mach_c7_title",
        title: "Combine Harvesters",
        descI18n: "mach_c7_desc",
        desc: "High-performance combine harvesters for grain crops. Features advanced threshing systems, large grain tanks, and precision GPS guidance.",
        delayClass: ""
    },
    {
        image: "./images/card8.jpg",
        alt: "Seeders & Sowing Machines",
        titleI18n: "mach_c8_title",
        title: "Seeders & Sowing Machines",
        descI18n: "mach_c8_desc",
        desc: "Precision sowing machines for row crops and cereals. Ensures every seed is placed at the exact right depth and spacing.",
        delayClass: "delay-100"
    },
    {
        image: "./images/card9.jpg",
        alt: "Fertilizer Spreaders",
        titleI18n: "mach_c9_title",
        title: "Fertilizer Spreaders",
        descI18n: "mach_c9_desc",
        desc: "Disc and pendulum spreaders for accurate fertilizer distribution. Adjustable spreading width and dosage for all crop types.",
        delayClass: "delay-200"
    },
    {
        image: "./images/card10.png",
        alt: "Field Sprayers",
        titleI18n: "mach_c10_title",
        title: "Field Sprayers",
        descI18n: "mach_c10_desc",
        desc: "Trailed and self-propelled field sprayers with wide booms and precision nozzle control for crop protection applications.",
        delayClass: ""
    },
    {
        image: "./images/card11.jpg",
        alt: "Telescopic Handlers",
        titleI18n: "mach_c11_title",
        title: "Telescopic Handlers (Telehandlers)",
        descI18n: "mach_c11_desc",
        desc: "Versatile telescopic loaders for lifting, loading, and handling on the farm. Available in various reach and capacity options.",
        delayClass: "delay-100"
    },
    {
        image: "./images/card12.png",
        alt: "Transport & Tipping Trailers",
        titleI18n: "mach_c12_title",
        title: "Transport & Tipping Trailers",
        descI18n: "mach_c12_desc",
        desc: "Heavy-duty agricultural tipping trailers and transport wagons. Built for durability and large load capacity.",
        delayClass: "delay-200"
    }
];

function renderMachineryCards() {
    const container = document.getElementById("machinery-cards-container");
    if (!container) return;

    let htmlContent = "";
    machineryCardsData.forEach((card, index) => {
        const imgFit = card.imageFit || "object-cover";
        const wrapperClass = card.wrapperEx || "";

        htmlContent += `
        <div onclick="openMachineryModal(this, ${index})" class="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col section-element cursor-pointer ${card.delayClass}">
            <div class="h-64 w-full relative overflow-hidden${wrapperClass}">
                <img src="${card.image}"
                    alt="${card.alt}"
                    class="w-full h-full ${imgFit} transition-transform duration-700 group-hover:scale-105"
                    style="aspect-ratio: 4/3;">
            </div>
            <div class="p-6 flex-1 flex flex-col">
                <h3 class="text-xl font-bold text-dark mb-3 group-hover:text-primary transition-colors"
                    data-i18n="${card.titleI18n}">${card.title}</h3>
                <p class="text-body text-sm mb-4 flex-1 line-clamp-3" data-i18n="${card.descI18n}">${card.desc}</p>
                <div class="text-primary font-bold hover:underline decoration-2 underline-offset-4 mt-auto block"
                    data-i18n="mach_btn_learn">Learn More &rarr;</div>
            </div>
        </div>
        `;
    });
    container.innerHTML = htmlContent;
}

function openMachineryModal(element, index) {
    const card = machineryCardsData[index];
    const modal = document.getElementById('machinery-modal');
    const modalContent = document.getElementById('machinery-modal-content');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');

    if (!modal) return;

    // Grab currently translated text directly from the clicked card
    const titleText = element.querySelector('h3').innerHTML;
    const descText = element.querySelector('p').innerHTML;

    // Populate modal
    modalImg.src = card.image;
    modalImg.alt = card.alt;

    // Handle image styles depending on object-fit
    const imgContainer = document.getElementById('modal-img-container');
    if (card.imageFit === 'object-contain') {
        modalImg.className = `w-full h-full object-contain p-8 md:p-16 transform transition-transform duration-700 group-hover:scale-105`;
        imgContainer.className = `h-64 sm:h-80 md:h-auto md:w-1/2 relative bg-white flex justify-center items-center overflow-hidden group`;
    } else {
        modalImg.className = `w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105`;
        imgContainer.className = `h-64 sm:h-80 md:h-auto md:w-1/2 relative bg-light flex justify-center items-center overflow-hidden group`;
    }

    // Update text and translation keys 
    modalTitle.innerHTML = titleText;
    modalTitle.setAttribute('data-i18n', card.titleI18n);

    modalDesc.innerHTML = descText;
    modalDesc.setAttribute('data-i18n', card.descI18n);

    // Show modal
    modal.classList.remove('invisible', 'opacity-0');
    modalContent.classList.remove('scale-95');
    modalContent.classList.add('scale-100');

    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
}

function closeMachineryModal() {
    const modal = document.getElementById('machinery-modal');
    const modalContent = document.getElementById('machinery-modal-content');

    if (!modal) return;

    // Hide modal
    modal.classList.add('opacity-0');
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-95');

    // Wait for transition to complete before making invisible
    setTimeout(() => {
        modal.classList.add('invisible');
    }, 300);

    // Restore body scrolling
    document.body.style.overflow = '';
}

// Close modal when clicking outside the content
window.addEventListener('click', function (event) {
    const modal = document.getElementById('machinery-modal');
    if (event.target === modal) {
        closeMachineryModal();
    }
});
