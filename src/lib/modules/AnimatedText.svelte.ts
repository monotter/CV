import { Signal } from "./Signal";

export class AnimatedText {
    Text: string = $state('');
    Ended = new Signal()
    OnText = new Signal()
    Play(FullText: string, Speed: number = 50) {
        this.Text = ''
        const interval = setInterval(() => {
            this.Text += FullText[this.Text.length]
            if (this.Text == FullText) {
                clearInterval(interval)
                this.Ended.Emit(FullText)
            }
            this.OnText.Emit(FullText[this.Text.length])
        }, Speed)
    }
}