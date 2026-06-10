import { supabase } from "../supabase/supabase";

export const loginUser = async (email, password) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) throw error

        return { success: true, data }
    } catch (error) {
        return { success: false, error: error.message }
    }
}

export const registerUser = async (email, password, firstname, lastname) => {
    try {

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) throw error

        if (data?.user) {
            const { error } = await supabase
                .from('profiles')
                .insert([
                    {
                        id: data.user.id,
                        first_name: firstname,
                        last_name: lastname
                    }
                ])

            if (error) throw error
        }

        return { success: true, data }
    } catch (error) {
        return { success: false, error: error.message }
    }
}


export const logoutUser = async () => {
    try {
        const { error } = await supabase.auth.signOut()

        if (error) throw error

        return { success: true }
    } catch (error) {
        return { success: false, error: error.message }
    }
}

export const getAuthUser = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return null;
    return user;
};