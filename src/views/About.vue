<template>
    <div class="about-container">
        <div class="message" v-html="newline"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            message:
            `Hello!\n
            We are two UX designers and one developer.\n\n

            We are looking for a new experience on the screen.\n
            Also, we are always considering how we can do it for user.\n
            This web page is the results of finding new experiences.\n
            Please look around comfortably!\n
            And if you have any good idea, you can suggest us anything.\n\n

            Thank you for visiting here :)`,
        }
    },
    computed: {
        newline: function() {
            return this.message.replace(/(?:\r\n|\r|\n)/g, '<br />')
        }
    },
    mounted() {
        this.$emit('updateBgStyle', '#eae6db');
    },
    beforeDestroy() {
        this.$emit('updateBgStyle', 'white');
    }
}
</script>
<style>
.about-container {
    position: relative;
}
.message {
    position: absolute;
    top: 173px;
    font-family: Futura;
    font-size: 24px;
}
</style>

