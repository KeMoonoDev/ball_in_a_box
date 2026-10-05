register_plugin = function (importObject) {
    importObject.env.get_canvas_position_x = get_canvas_position_x;
    importObject.env.get_canvas_position_y = get_canvas_position_y;
    importObject.env.get_cursor_position_x = get_cursor_position_x;
    importObject.env.get_cursor_position_y = get_cursor_position_y;
    importObject.env.finished_loading = finished_loading;
}

// register this plugin in miniquad, required to make plugin's functions available from rust
miniquad_add_plugin({ register_plugin });

function hook_sapp_set_window_position(width, height) {
    var rect = canvas.getBoundingClientRect();
    let box_width = rect.right - rect.left;
    let box_height = rect.bottom - rect.top;
    let origin_x =
        window.innerWidth / 2;
    let origin_y =
        window.innerHeight / 2;
    canvas.style.left = `calc(50% + ${width - (origin_x - box_width / 2)}px)`;
    canvas.style.top = `calc(50% + ${height - (origin_y - box_height / 2)}px)`;
};

function get_canvas_position_x() {
    var rect = canvas.getBoundingClientRect();
    return rect.left
};

function get_canvas_position_y() {
    var rect = canvas.getBoundingClientRect();
    return rect.top
};

let cursor_x = 0;
let cursor_y = 0;

document.addEventListener("mousemove", function (event) {
    cursor_x = event.pageX;
    cursor_y = event.pageY;
});

function get_cursor_position_x() {
    return cursor_x
};

function get_cursor_position_y() {
    return cursor_y
};

function finished_loading() {
    let loading_screen = document.getElementById("loading_screen");
    if (loading_screen)
        loading_screen.remove()
};

function start_ball_in_a_box() {
    if (document.getElementById("glcanvas"))
        return;


    let old_loading_screen = document.getElementById("loading_screen");

    if (old_loading_screen)
        old_loading_screen.remove();


    let loading_screen = document.createElement('img');
    loading_screen.src = "loading.webp";
    loading_screen.id = "loading_screen";
    loading_screen.className = "initial_box";
    loading_screen.style.width = "640px";
    loading_screen.style.height = "480px";
    document.body.prepend(loading_screen);

    let canvas = document.createElement('canvas');
    canvas.id = "glcanvas";
    canvas.className = "initial_box";
    canvas.style.width = "640px";
    canvas.style.height = "480px";
    canvas.tabIndex = '1';
    document.body.prepend(canvas);

    load("target/wasm32-unknown-unknown/release/ball_in_a_box.wasm", canvas)
}

function stop_ball_in_a_box() {
    let loading_screen = document.getElementById("loading_screen");
    if (loading_screen)
        loading_screen.remove()

    quit_current()

}