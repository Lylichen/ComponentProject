<!-- 使用方法 
属性绑定  v-model="" 
回调绑定  onClick="(val)=>{console.log(val)}"
-->
<template>
    <div class="switch-button">
        <label for="switch">
            <input 
                ref="input"
                type="checkbox" 
                id="switch"
                :value="value"
                :checked="value"
                @change="handleInput"
                name="switch" />
            <span class="needsclick"></span>
        </label>
    </div>
</template>

<script>
export default {
    props: ['value','onClick'],
    methods: {
        async handleInput($event) {
          console.log($event)
            await this.onClick($event.target.checked)
            this.$emit('input', $event.target.checked)
        }
    }
}
</script>


<style lang="scss" scoped>
    .switch-button {
        label {
            input {
                visibility: hidden;
            }
            span {
                width: 5.4rem;
                height: 2.4rem;
                border-radius: 1.2rem;
                position: relative;
                background-color:#fd5854;
                display: block;
                transition: 150ms all cubic-bezier(.17,.67,.83,.67);
                &::before {
                    content: ' ';
                    width: 2rem;
                    height: 2rem;
                    border-radius: 100%;
                    background-color: #fff;
                    position: absolute;
                    display: block;
                    top: .2rem;
                    left: .2rem;
                    transition: 150ms all cubic-bezier(.17,.67,.83,.67);
                }
            }
        }
        #switch:checked~span{
            background-color: #26C68C;
            &::before {
                content: ' ';
                width: 2rem;
                height: 2rem;
                border-radius: 100%;
                background-color: #fff;
                position: absolute;
                display: block;
                top: .2rem;
                left: 3.2rem;
            }
        }
    }
</style>
