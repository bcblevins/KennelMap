import { createClient } from "@supabase/supabase-js";

const supabase = createClient('https://fsamftqmgwvehwqrmlwm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzYW1mdHFtZ3d2ZWh3cXJtbHdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc1NTczNjMsImV4cCI6MjA0MzEzMzM2M30.uR95eJLovJUM05RX-iG-bEzhfkcA_mRvW4NO7jdYQJM')

export default {
    async getKennel(kennel_id) {
        const { data, error } = await supabase
            .from('kennel')
            .select('*')
            .eq('kennel_id', kennel_id)
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
    async updateRun(run) {
        const { data, error } = await supabase
            .from('kennel')
            .update(run)
            .eq('id', run.id)
        if (error) {
            throw new Error(error.message)
        }
        return data
    },
    async getKennelDate(kennel_id) {
        const { data, error } = await supabase
            .from('saved_kennels')
            .select('date')
            .eq('id', kennel_id)
        if (error) {
            throw new Error(error.message)
        }
        return data
    },
    async getKennelList() {
        const { data, error } = await supabase
            .from('saved_kennels')
            .select('*')
        if (error) {
            throw new Error(error.message)
        }
        return data
    },
    async saveKennel(runs, savedKennel) {
        const { data, error } = await supabase
            .from('saved_kennels')
            .insert(savedKennel)
            .select('id')
        if (error) {
            throw new Error(error.message)
        }

        for (let run of runs) {
            console.log(data[0].id)
            run.kennel_id = data[0].id
            console.log(run)
            const { runData, error } = await supabase
                .from('kennel')
                .insert(run)
            if (error) {
                throw new Error(error.message)
            }
        }
        return data
        } 
}
