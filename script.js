/* =========================
   INTRO ANIMATION TIMING
========================= */

const welcomeScreen =
    document.getElementById("welcomeScreen");

const nameScreen =
    document.getElementById("nameScreen");

const intro =
    document.getElementById("intro");

const main =
    document.getElementById("main");


/* =========================
   WELCOME SHOW FOR 10 SECONDS
========================= */

setTimeout(() => {


    /* HIDE WELCOME */

    welcomeScreen.style.opacity =
        "0";


    welcomeScreen.style.transform =
        "scale(1.4)";


    /* SHOW PHOBICC_AJMALL */

    nameScreen.classList.remove(
        "hidden"
    );


    nameScreen.style.opacity =
        "1";


    nameScreen.style.transform =
        "scale(1)";


    /* =========================
       SHOW NAME FOR 1 SECOND
       THEN BLACK FADE
    ========================= */

    setTimeout(() => {


        /* START BLACK FADE */

        intro.style.opacity =
            "0";


        /* SHOW WEBSITE */

        main.style.display =
            "block";


        /* LOAD UPLOADED MEDIA */

        loadMedia();


        /* REMOVE INTRO AFTER FADE */

        setTimeout(() => {

            intro.style.display =
                "none";

        }, 1000);


    }, 1000);


}, 10000);



/* =========================
   LOAD GALLERY MEDIA
========================= */

async function loadMedia(){

    const gallery =
        document.getElementById("gallery");


    try{

        const response =
            await fetch(
                "/api/media"
            );


        const media =
            await response.json();


        /* =========================
           NO MEDIA
        ========================= */

        if(!media.length){

            gallery.innerHTML = `

                <div class="empty-message">

                    No photos or videos uploaded yet.

                </div>

            `;

            return;

        }


        /* =========================
           CLEAR GALLERY
        ========================= */

        gallery.innerHTML =
            "";


        /* =========================
           ADD MEDIA
        ========================= */

        media.forEach(item => {


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "card";


            let mediaHTML =
                "";


            /* PHOTO */

            if(
                item.type ===
                "image"
            ){

                mediaHTML = `

                    <img
                        src="/uploads/${item.filename}"
                        alt="Phobicc_ajmall"
                    >

                `;

            }


            /* VIDEO */

            else if(
                item.type ===
                "video"
            ){

                mediaHTML = `

                    <video
                        controls
                        preload="metadata"
                    >

                        <source
                            src="/uploads/${item.filename}"
                        >

                    </video>

                `;

            }


            /* =========================
               CARD CONTENT
            ========================= */

            card.innerHTML = `

                ${mediaHTML}


                <div class="card-content">


                    <h3>
                        Description
                    </h3>


                    <p>
                        ${item.description || "No description"}
                    </p>


                    <h3
                        style="
                            margin-top:20px
                        "
                    >

                        Details

                    </h3>


                    <p>
                        ${item.details || "No details"}
                    </p>


                </div>

            `;


            gallery.appendChild(
                card
            );


        });


    }

    catch(error){

        console.error(
            "Gallery error:",
            error
        );


        gallery.innerHTML = `

            <div class="empty-message">

                Unable to load gallery.

            </div>

        `;

    }

}