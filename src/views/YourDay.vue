<template>
    <div class="yourday">
        <span>"How was your day?"</span>
        <div class='img-container'>
            <img src="@/assets/congal1/happy.png" class="happy"/>
            <img src="@/assets/congal1/comfortable.png" class="comfortable"/>
            <img src="@/assets/congal1/angry.png" class="angry"/>
            <img src="@/assets/congal1/worry.png" class="worry"/>
            <img src="@/assets/congal1/sad.png" class="sad"/>
        </div>
    </div>
</template>
<script>
const location = {
    'happy': {}, 
    'comfortable': {},
    'angry': {},
    'worry': {},
    'sad': {},
}
export default {
    components: {
    },
    data() {
        return {
            
        }
    },
    watch: {
        loadingCount(newVal) {
            if (newVal >= this.iconImgs.length) {
                this.start = true;
            }
        }
    },
    methods: {
    },
    mounted() {
        console.log('mounted');
        this.imgLoading();
    },
}
</script>
<style>
.menuBtn {
    position: absolute;
    top: 50px;
    right: 50px;
}

.yourday {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.yourday > span {
    font-size: 72px;
    /* width: 653px; */
    height: 94px;
    font-family: Futura;
    font-size: 72px;
    font-weight: 500;
    text-align: center;
    color: #000000;
    /* outline: 1px solid black; */
}

@media (min-width: 800px)
{
}

</style>

