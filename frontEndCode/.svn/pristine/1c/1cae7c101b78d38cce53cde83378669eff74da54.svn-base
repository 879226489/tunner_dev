<template>
    <span>
        <Button icon="md-cloud-download" @click="importData">导入</Button>
        <input ref="input" type="file" v-show="false" @change="getFile" />
    </span>
</template>

<script>
    export default {
        name: 'uploadFile',
        props: {
            uploadFunc: {
                type: Function
            }
        },
        data() {
            return {

            }
        },
        methods: {
            importData() {
                this.$refs.input.click();
            },
            getFile() {
                let fd = new FormData();
                fd.set("file", this.$refs.input.files[0])
                this.uploadFunc(fd).then(res => {
                    console.log(res);
                    if(res.data.code == 200) {
                        this.$Message.success(res.data.msg);
                        this.$emit("success", true)
                    }
                    this.$refs.input.value = "";
                })
            }
        }
    }
</script>

