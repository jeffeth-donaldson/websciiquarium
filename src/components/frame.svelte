<!-- 
    A "frame" for ASCII art or other text Content. Will always render the text in the center of the frame.
-->
<script lang="ts">
    export let content: string;
    export let title: string = "Embedded Content";
    export let width: number = 800;
    export let height: number = 600;
</script>

<div class="frame" style="width: {width}px; height: {height}px;" title={title}>
    <pre>{@html content}</pre>
</div>

<style>
    .frame {
        background-color: #f0f0f0;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        border: 2px solid #000; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        overflow: hidden;
    }

</style>