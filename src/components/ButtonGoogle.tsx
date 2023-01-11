import { useEffect, useState } from "react";
import { SIGNIN_GOOGLE_URL, SIGNUP_GOOGLE_URL } from "../types/user";
import { signinGoogle, signupGoogle } from "../helpers/authUser";



export default function GoogleButton({ type }: { type: "signin" | "signup" }): JSX.Element {
    const clientId: any = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    const [loading, setLoading] = useState(false);
    const [scriptLoaded, setScriptLoaded] = useState(false);

    const handleGoogle = (res: any) => {
        setLoading(true)
        type === "signin" ?
            signinGoogle({ credential: res.credential }) : signupGoogle({ credential: res.credential })
    }
    useEffect(() => {
        /* global google */
        // console.log('windows google', window.google);
        const initializeGoogle = () => {
            if (!window.google || scriptLoaded) return;

            setScriptLoaded(true);
            window.google.accounts.id.initialize({
                client_id: clientId,
                callback: handleGoogle,
            });

            if (type === 'signup') {
                window.google.accounts.id.renderButton(document.getElementById("g-signin2") as HTMLElement, {
                    type: "standard",
                    theme: "filled_blue",
                    // size: "small",
                    text: "signup_with",
                    shape: "square",
                    width: "327"
                });
            } else {
                window.google.accounts.id.renderButton(document.getElementById("g-signin2") as HTMLElement, {
                    type: "standard",
                    theme: "filled_blue",
                    // size: "small",
                    text: "signin_with",
                    shape: "rectangular",
                    width: "327"
                });
            }

        }

        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.onload = initializeGoogle;
        script.async = true;
        script.id = "google-client-script";
        document.querySelector("body")?.appendChild(script);

        // google.accounts.id.prompt()
    }, [handleGoogle, scriptLoaded]);


    return loading ? <div>Loaing....</div> : <div id="g-signin2"></div>;
}
