import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'
import { url_path, api_key } from './env-vars.js'

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize Supabase Client
    const supabase = createClient(url_path, api_key)

    // Form submission event listener
    document.getElementById("loginForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        // Get form data
        let ime = document.getElementById("ime").value;
        let prezime = document.getElementById("prezime").value;
        let email = document.getElementById("email").value;
        let telefon = document.getElementById("telefon").value;
        let poruka = document.getElementById("poruka").value;

        // Form data object
        let submit_data = {
            'ime': ime,
            'prezime': prezime,
            'email': email,
            'telefon': telefon,
            'poruka': poruka
        }

        for (const key in submit_data) {
            console.log(`${key}: ${submit_data[key]}`);
        }

        const { error } = await supabase
        .from('kontakt_upiti')
        .insert({
            'ime': submit_data['ime'],
            'prezime': submit_data['prezime'],
            'email': submit_data['email'],
            'broj_tel': submit_data['telefon'],
            'poruka': submit_data['poruka'],
            'ip_adresa': '1234'
        });

        if (error) {
            console.error('Error inserting data:', error.message);
        } else {
            console.log('Data inserted successfully:', data);
        }

    });
});