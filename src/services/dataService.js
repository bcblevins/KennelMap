import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://fsamftqmgwvehwqrmlwm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzYW1mdHFtZ3d2ZWh3cXJtbHdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc1NTczNjMsImV4cCI6MjA0MzEzMzM2M30.uR95eJLovJUM05RX-iG-bEzhfkcA_mRvW4NO7jdYQJM'
)

export default {
  async getRuns(kennel_id) {
    const { data, error } = await supabase.from('runs').select('*').eq('kennel_id', kennel_id)
    if (error) {
      throw new Error(error.message)
    }
    return data
  },
  async getRun(id) {
    const { data, error } = await supabase.from('runs').select('*').eq('id', id)
    if (error) {
      throw new Error(error.message)
    }
    return data
  },
  async updateRun(run) {
    const { data, error } = await supabase.from('runs').update(run).eq('id', run.id)
    if (error) {
      throw new Error(error.message)
    }
    return data
  },
  async getKennel(kennelId) {
    const { data, error } = await supabase.from('kennels').select('*').eq('id', kennelId)
    if (error) {
      throw new Error(error.message)
    }
    return data
  },
  async getKennelDate(kennel_id) {
    const { data, error } = await supabase.from('kennels').select('date').eq('id', kennel_id)
    if (error) {
      throw new Error(error.message)
    }
    return data
  },
  async getKennelList() {
    const { data, error } = await supabase.from('kennels').select('*')
    if (error) {
      throw new Error(error.message)
    }
    return data
  },
  async saveKennel(runs, savedKennel) {
    const { data, error } = await supabase.from('kennels').insert(savedKennel).select('id')
    if (error) {
      throw new Error(error.message)
    }
    let newKennelId = data[0].id

    for (let run of runs) {
      run.kennel_id = newKennelId
      const { runData, error } = await supabase.from('runs').insert(run)
      if (error) {
        throw new Error(error.message)
      }
    }
    return newKennelId;
  },
  async deleteKennel(kennelId) {
    const { data, error } = await supabase.from('kennels').delete().eq('id', kennelId)
    if (error) {
      throw new Error(error.message)
    }
    return data
  }
}
