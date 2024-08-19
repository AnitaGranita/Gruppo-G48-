import store from '@/store';
import axios from 'axios';

store.subscribe((mutation, state) => {
    console.log('Mutation detected:', mutation); // Verifica se la mutazione viene catturata

    switch (mutation.type) {
        case 'auth/SET_TOKEN':
            console.log('Processing SET_TOKEN mutation');
            if (mutation.payload) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${mutation.payload}`;
                localStorage.setItem('Token', mutation.payload);
                console.log('Token saved:', mutation.payload);
                localStorage.setItem('TestKey', 'TestValue');
                console.log('TestKey value:', localStorage.getItem('TestKey')); // Dovrebbe stampare 'TestValue'
                localStorage.removeItem('TestKey');
                console.log('TestKey value after removal:', localStorage.getItem('TestKey')); // Dovrebbe stampare null
            } else {
                delete axios.defaults.headers.common['Authorization'];
                localStorage.removeItem('Token');
            }
            break;
    }
});
