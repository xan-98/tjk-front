<template>
    <div class="register">
        <div class="container">
            <form @submit="onSubmitForm" action="#" class="signin-form">
                <div class="row justify-content-center pb-5 pt-5">
                    <div class="col-md-12 col-lg-10">
                        <div class="d-flex">
                            <div class="w-100">
                                <h3 class="mb-4">Sign Up</h3>
                            </div>

                        </div>
                        <div class="wrap d-md-flex">
                            <div class="login-wrap p-4 p-md-5">


                                <div class="form-group mb-3">
                                    <label class="label" for="name">Username</label>
                                    <input v-model="userInfo.first_name" type="text" class="form-control"
                                        placeholder="Username" required>
                                </div>

                                <div class="form-group mb-3">
                                    <label class="label" for="email">Email</label>
                                    <input v-model="userInfo.email" type="email" class="form-control"
                                        placeholder="Email" required>
                                </div>

                                <div class="form-group mb-3">
                                    <label class="label" for="phone">Phone</label>
                                    <input v-model="userInfo.phone" type="text" class="form-control" placeholder="Phone"
                                        required>
                                </div>
                            </div>




                            <div class="login-wrap p-4 p-md-5">


                                <div class="form-group mb-3">
                                    <label class="label" for="address">Address</label>
                                    <input v-model="userInfo.address" type="text" class="form-control"
                                        placeholder="Address" required>
                                </div>

                                <div class="form-group mb-3">
                                    <label class="label" for="password">Password</label>
                                    <input v-model="userInfo.password" type="password" minlength="5"
                                        class="form-control" placeholder="Password" required>
                                </div>

                                <div class="form-group mb-3">
                                    <label class="label" for="confirm_password">Password confirm</label>
                                    <input v-model="userInfo.confirm_password" minlength="5" type="password"
                                        class="form-control" placeholder="Password Confirm" required>
                                </div>
                                <div class="form-group">
                                    <button type="submit" class="form-control btn btn-primary rounded submit px-3">
                                        SignUp
                                    </button>
                                </div>
                                <div class="form-group d-md-flex">
                                    <div class="w-50 text-left">
                                        <div class="custom-control custom-checkbox">
                                            <input id="remember" type="checkbox" name="remember"
                                                class="custom-control-input" value="accepted">
                                            <label for="remember" class="custom-control-label">
                                                Remember
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <p class="text-center"> Member?
                                    <NuxtLink to="/login" class="singup">Login</NuxtLink>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            valid: false,
            userInfo: {
                username: 'gylyc',
                email: 'gylc@ddc.com',
                first_name: 'gylyc',
                password: 'gylyc',
                confirm_password: 'gylyc',
                phone: 'gylyjyn nomeri',
                address: 'gylyjyn yasayan yeri',

                remember: true
            },
        }
    },


    methods: {

        toast(message, append = false) {
            this.counter++
            this.$bvToast.toast(`${message}`, {
                title: `Formda ýalnyşlyk`,
                toaster: 'b-toaster-top-center',
                solid: true,
                appendToast: append,
                variant: 'danger'
            })
        },

        async onSubmitForm(event) {
            event.preventDefault();

            this.userInfo.username = this.userInfo.email

            if (this.userInfo.password !== this.userInfo.confirm_password) {

                this.toast('Parollar gabat gelmedi!')
                return false
            }
            this.$auth.logout()

            this.$axios
                .post('/register', this.userInfo)
                .then(res => {
                    if (res.data.success) {
                        this.loginuser()
                    }
                })
                .catch(err => {
                    if (err.response.data.username)
                        this.toast('Email öň bar')
                    else
                        this.toast('Ýalňyşlyk bar täzeden barlaň')
                });
        },

        async loginuser() {
            let response = await this.$auth.loginWith('local', { data: this.userInfo })
            this.$auth.strategy.token.set(response.data.access)

            this.$auth.fetchUser()
            
            console.log(this.$auth.user);
        }
    }
}
</script>

<style lang="scss" scoped>
// .register .img {
//     background-image: url(~/assets/img/login-bg.jpg);
// }

.custom-checkbox .custom-control-input:checked~.custom-control-label::after {
    top: 0.4rem;
    background-color: #000000;
}

.custom-control-input:checked~.custom-control-label::before {
    border-color: #000000;
}

.custom-control-label::before {
    top: 0.4rem;
}

.singup:hover {
    color: #EC0153;
}
</style>