<a name="CHDJCIAI">**Synopsis** **javadoc** {_packages_|_source-files_} [_options_] [_@argfiles_]</a>

<dl>
  <dt>_packages_</dt>
  <dd>Names of packages that you want to document, separated by spaces, for example `java.lang java.lang.reflect java.awt`. If you want to also document the subpackages, use the `-subpackages` option to specify the packages. By default, `javadoc` looks for the specified packages in the current directory and subdirectories. Use the `-sourcepath` option to specify the list of directories where to look for packages.</dd>

  <dt>_source-files_</dt>
  <dd>Names of Java source files that you want to document, separated by spaces, for example `Class.java Object.java Button.java`. By default, `javadoc` looks for the specified classes in the current directory. However, you can specify the full path to the class file and use wildcard characters, for example `/home/src/java/awt/Graphics*.java`. You can also specify the path relative to the current directory.</dd>

  <dt>_options_</dt>
  <dd><a name="CHDJCIAI">Command-line options, separated by spaces. See</a>[Options](http://docs.oracle.com/javase/8/docs/technotes/tools/windows/javadoc.html#CHDFDACB).</dd>

  <dt>_@argfiles_</dt>
  <dd>Names of files that contain a list of `javadoc` command options, package names and source file names in any order.</dd>
</dl>
