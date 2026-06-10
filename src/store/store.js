import { ref } from 'vue';
import { supabase } from '../supabase/supabase.js'; // Import ang supabase client mo

export const myCredits = ref(0);

// Function para i-load ang credits galing sa database
export const fetchCredits = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        const { data } = await supabase
            .from('profiles')
            .select('credits')
            .eq('id', user.id)
            .single();

        if (data) {
            myCredits.value = data.credits;
        }
    }
};

// Function para magdagdag (yung na-save na natin sa DB sa modal)
export const addCredits = (amount) => {
    myCredits.value += amount;
};