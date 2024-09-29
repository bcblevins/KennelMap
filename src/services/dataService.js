import { createClient } from "@supabase/supabase-js";

const supabase = createClient('https://fsamftqmgwvehwqrmlwm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzYW1mdHFtZ3d2ZWh3cXJtbHdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc1NTczNjMsImV4cCI6MjA0MzEzMzM2M30.uR95eJLovJUM05RX-iG-bEzhfkcA_mRvW4NO7jdYQJM')

export default {
    async getKennel() {
        const { data, error } = await supabase
            .from('kennel')
            .select('*')
        if (error) {
            throw new Error(error.message)
        }
        return data
    },
    async getRun(id) {
        const { data, error } = await supabase
            .from('kennel')
            .select('*')
            .eq('id', id)
        if (error) {
            throw new Error(error.message)
        }
        return data
    },
    async updateRun(kennel) {
        const { data, error } = await supabase
            .from('kennel')
            .update(kennel)
            .eq('id', kennel.id)
        if (error) {
            throw new Error(error.message)
        }
        return data
    }
}
