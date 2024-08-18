import axios from 'axios';

export default{
    namespaced: true,
    state:{
        token:null,
        user:null,
    },
    mutations:{
        SET_TOKEN(state,token){ //salva il token nello state
            state.token = token
        },
        SET_USER(state,data){ //salva i dati dell'user nello state
            state.user = data
        }
    },

    getters:{
        authenticated(state){
            return state.token && state.user
        },
        user(state){
            return state.user
        }
    },


    actions:{
        async signIn({dispatch},credentials){
            const response = await fetch('/api/utente/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password
                })
            });
            const data = await response.json();
            dispatch('attempt',data.token)
            console.log(data.token)
        },
        async attempt({commit},token){
            commit('SET_TOKEN',token)
            try{
                let response = await axios.get('auth/me',{
                    headers:{
                        'Authorization':'Bearer ' + token
                    }
                })
                commit('SET_USER', response.data)
                if (response.data) {
                    commit('SET_USER', response.data);
                    console.log(response.data)
                  } else {
                    throw new Error('Dati utente mancanti');
                  }
            }
            catch(e){
                commit('SET_TOKEN',null)
                commit('SET_USER',null)
                console.log('Salvataggio del token non riuscito')
            }
        }
    }
}