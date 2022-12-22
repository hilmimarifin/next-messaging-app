import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function GoogleButton(): JSX.Element {
    const clientId: any = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    const [loading, setLoading] = useState(false);
    const [scriptLoaded, setScriptLoaded] = useState(false);

    const handleGoogle = (res: any) => {
        setLoading(true)
        fetch("http://localhost:4000/user/signup-google", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({ credential: res.credential }),
        })
            .then((res) => {
                setLoading(false)
                return res.json();
            })
            .then((data) => {
                if (data?.user) {
                    localStorage.setItem("user", JSON.stringify(data?.user));
                    window.location.reload();
                }

                throw new Error(data?.message || data);
            })
            .catch((error) => {
                console.log(error?.message);
            });
    }
    useEffect(() => {
        /* global google */
        console.log('windows google', window.google);
        const initializeGoogle = () => {
            if (!window.google || scriptLoaded) return;
        
            setScriptLoaded(true);
            window.google.accounts.id.initialize({
                client_id: clientId,
                callback: handleGoogle,
            });

            window.google.accounts.id.renderButton(document.getElementById("signUpDiv") as HTMLElement, {
                type: "standard",
                theme: "filled_black",
                // size: "small",
                text: "continue_with",
                shape: "pill",
            });

        }

            const script = document.createElement("script");
            script.src = "https://accounts.google.com/gsi/client";
            script.onload = initializeGoogle;
            script.async = true;
            script.id = "google-client-script";
            document.querySelector("body")?.appendChild(script);

            // google.accounts.id.prompt()
    }, [handleGoogle, scriptLoaded]);


    return loading ? <div>Loaing....</div> : <div id="signUpDiv" data-text="signup_with"></div>;
}
