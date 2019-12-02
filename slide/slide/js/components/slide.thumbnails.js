Slide.proto({
    makeThumbnail: function(element, id) {
        const thumbnail = document.createElement("a");

        thumbnail.setAttribute("href", "#" + this.name + "-" + id);
        thumbnail.setAttribute("data-slide-index", id);

        thumbnail.setAttribute("class", "slide__thumbnail");
        thumbnail.appendChild(element);
        return thumbnail;
    },
    addThumbnail: function(thumbnail) {
        if (this.thumbnails) {
            this.thumbnails.appendChild(thumbnail);
        }
    },
    selectThumbnail: function(id) {
        if (this.thumbnails) {
            const name = "slide__thumbnail--is-selected";
            const index = "[data-slide-index='" + id + "']";

            const elements = this.thumbnails.querySelectorAll("." + name);
            const thumbnail = this.thumbnails.querySelector(index);
            const thumbnails = this.toArray(elements);

            thumbnails.forEach(function(thumbnail) {
                thumbnail.classList.remove(name);
            });

            thumbnail.classList.add(name);
        }
    },
    addThumbnailImage: function(img) {
        const thumbnail = this.makeThumbnail(img, this.countChildren());
        this.addThumbnail(thumbnail);
    }
});
