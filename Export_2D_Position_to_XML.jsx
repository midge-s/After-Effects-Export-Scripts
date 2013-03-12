// Make sure your selected layers have unique layer names

function getAndWriteData(comp)
{
 
    for (var i = 0; i < comp.selectedLayers.length; i++){
        
        // alert("layer: " + i) ;
       
        var layer = comp.selectedLayers[i];
        // scale the points by this factor
        var scale = 1 / 1;
        // total number of frames in the layer
        var numf = Math.round((layer.outPoint - layer.inPoint) / comp.frameDuration);
        // first frame in the layer
        var startf = Math.round(layer.inPoint / comp.frameDuration);
        // the display frame number that will incremented
        var countf = startf;
         // get the layer name
        var layername = layer.name
        // open the file
        var file = new File(layername + ".xml");
       
        if (file.open("w"))
        {
            // write the plist header
            file.writeln('<?xml version="1.0" encoding="UTF-8"?>');
            file.writeln('<dict>');
            file.writeln('  <!-- length:' + numf + ' startframe:' + startf + ' endframe:' + (startf + numf - 1) + ' -->');
            file.writeln('	<key>id</key>');
            file.writeln('	<string>xxx</string>');
            file.writeln('	<key>points</key>');
            file.writeln('	<array>');

            // step through the frames
            for (var t = layer.inPoint; t < layer.outPoint; t += comp.frameDuration)
            {
                var myp = layer.transform.position.valueAtTime(t, false);
                // write the location to a line of the file
                writeme = "		<string>{" + (myp[0] * scale) + ", " + (myp[1] * scale) + "}</string>";
                file.writeln(writeme);
            }
            file.writeln('	</array>');
            file.writeln('</dict>');
            //file.writeln('</plist>');
            file.close();
        }
    }

}
 var comp = app.project.activeItem;
getAndWriteData(comp);
